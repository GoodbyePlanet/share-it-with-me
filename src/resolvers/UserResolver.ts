import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import {PrismaClient} from "@prisma/client";
import {Service} from "typedi";
import {IsEmail, Matches} from "class-validator";

import {NotFound} from "../middlewares/notFound";
import {UserService} from "../service/UserService";
import {User} from "../model/User";

@InputType()
export class CreateUserInput {

  @Field()
  @IsEmail()
  email: string;

  @Field()
  username: string;

  @Field()
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
  password: string;
}

@ObjectType()
class SignUpResponse {

  @Field()
  token: string

  @Field(() => User)
  user: User
}

@Service()
@Resolver(User)
export class UserResolver {

  constructor(private readonly userService: UserService) {
  }

  @Authorized("ADMIN")
  @Query(() => [User])
  async users(@Ctx("prisma") prisma: PrismaClient) {
    return this.userService.getUsers(prisma);
  }

  @Authorized("ADMIN", "USER")
  @UseMiddleware(NotFound)
  @Query(() => User, {nullable: true})
  async userById(@Ctx("prisma") prisma: PrismaClient, @Arg("id") id: string) {
    return this.userService.getUserById(id, prisma);
  }

  @FieldResolver()
  async posts(@Root() user: User, @Ctx("prisma") prisma: PrismaClient) {
    return this.userService.posts(user.id, prisma);
  }

  @Mutation(() => SignUpResponse, {name: "signUp"})
  async createUser(@Arg('createUserInput') createUserInput: CreateUserInput,
                   @Ctx("prisma") prisma: PrismaClient) {
    return this.userService.createUser(createUserInput, prisma);
  }

}