import {Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver} from "type-graphql";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import {Context} from "../context";
import {UserNotFoundError, WrongCredentialsError} from "../errorHandling";
import {APP_SECRET} from "../utils/config";
import {User} from "../model/User";

const signJwtToken = (userId: string, role: string) => jwt.sign({userId, role}, APP_SECRET!);

@InputType()
class UserLoginInput {

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

@Resolver(LoginResponse)
export class AuthenticationResolver {

  @Mutation(() => LoginResponse)
  async login(@Arg('loginInput') loginInput: UserLoginInput, @Ctx() ctx: Context) {

    const user = await ctx.prisma.user.findUnique({where: {email: loginInput.email}});

    if (!user) {
      throw UserNotFoundError;
    }

    const isValid = await bcrypt.compare(loginInput.password, user.password);

    if (!isValid) {
      throw WrongCredentialsError;
    }

    return {token: signJwtToken(user.id, user.role), user};
  }

}