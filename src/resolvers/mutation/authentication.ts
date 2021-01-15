import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {AuthResponse, Context, CreateUserInput, LoginUserInput} from "../../types";
import {APP_SECRET} from "../../utils/config";
import {WrongCredentialsError, UserNotFoundError} from "../../validation";
import {Role} from "../../generated/prisma-client";

const SALT_WORK_FACTOR = 10;

const signJwtToken = (userId: string, role: Role): string => {
  return jwt.sign({userId, role}, APP_SECRET!);
}

export const signup = async (_: any, {user: userInput}: CreateUserInput, ctx: Context): Promise<AuthResponse> => {
  const password = await bcrypt.hash(userInput.password, SALT_WORK_FACTOR);
  const user = await ctx.prisma.createUser({...userInput, password});

  return {token: signJwtToken(user.id, user.role), user}
}

export const login = async (_: any, {user: {email, password}}: LoginUserInput, ctx: Context): Promise<AuthResponse> => {
  const user = await ctx.prisma.user({email});

  if (!user) {
    return new UserNotFoundError;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return new WrongCredentialsError;
  }

  return {token: signJwtToken(user.id, user.role), user}
}