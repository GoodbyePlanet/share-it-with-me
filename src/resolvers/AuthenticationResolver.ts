import {PrismaClient} from "@prisma/client";
import {Service} from "typedi";
import {Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver} from "type-graphql";

import {User} from "../model/User";
import {AuthenticationService} from "../service/AuthenticationService";

@InputType()
export class UserLoginInput {

  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
class LoginResponse {

  @Field()
  token: string

  @Field(() => User)
  user: User
}

@Service()
@Resolver(LoginResponse)
export class AuthenticationResolver {

  constructor(private readonly authenticationService: AuthenticationService) {
  }

  @Mutation(() => LoginResponse)
  async login(@Arg('loginInput') loginInput: UserLoginInput, @Ctx("prisma") prisma: PrismaClient) {
    return this.authenticationService.login(loginInput, prisma)
  }

}