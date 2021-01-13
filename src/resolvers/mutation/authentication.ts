import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {AuthPayload, Context, UserInput} from "../../types";
import {APP_SECRET} from "../../utils/config";

const SALT_WORK_FACTOR = 10;

export const signup = async (_: any, {user: userInput}: UserInput, ctx: Context): Promise<AuthPayload> => {
  const password = await bcrypt.hash(userInput.password, SALT_WORK_FACTOR);
  const user = await ctx.prisma.createUser({...userInput, password});

  return {
    token: jwt.sign({userId: user.id}, APP_SECRET!),
    user
  }
}