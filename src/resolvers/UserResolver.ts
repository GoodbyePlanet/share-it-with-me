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
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import {NotFound} from "../middlewares/notFound";
import {User} from "../model/User";
import {Context} from "../context";
import {APP_SECRET} from "../utils/config";
import {UserAlreadyExistsError} from "../errorHandling";

const SALT_WORK_FACTOR = 10;
const signJwtToken = (userId: string, role: string): string => {
  return jwt.sign({userId, role}, APP_SECRET!);
}

@InputType()
class CreateUserInput {

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class SignUpResponse {

  @Field()
  token: string

  @Field(() => User)
  user: User
}

@Resolver(User)
export class UserResolver {

  @Authorized("ADMIN", "USER")
  @UseMiddleware(NotFound)
  @Query(() => User, {nullable: true})
  async userById(@Ctx() ctx: Context, @Arg("id") id: string) {
    return ctx.prisma.user.findUnique({where: {id}});
  }

  @Authorized("ADMIN")
  @Query(() => [User])
  async users(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }

  @FieldResolver()
  async posts(@Root() user: User, @Ctx() ctx: Context) {
    return ctx.prisma.user.findUnique({where: {id: user.id}}).posts();
  }

  @Mutation(() => SignUpResponse, {name: "signUp"})
  async createUser(@Arg('createUserInput') createUserInput: CreateUserInput, @Ctx() ctx: Context) {
    const password = await bcrypt.hash(createUserInput.password, SALT_WORK_FACTOR);
    const existingUser = await ctx.prisma.user.findUnique({where: {email: createUserInput.email}});

    if (existingUser) {
      throw UserAlreadyExistsError;
    }

    const user = await ctx.prisma.user.create({data: {...createUserInput, password}});
    return {token: signJwtToken(user.id, user.role), user}
  }

}