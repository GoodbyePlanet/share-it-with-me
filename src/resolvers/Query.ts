import {Context} from "../types";
import {FragmentableArray, User, UserNullablePromise} from "../generated/prisma-client";

export const Query = {
  users(_: any, __: any, ctx: Context): FragmentableArray<User> {
    return ctx.prisma.users();
  },
  userById(_: any, args: any, ctx: Context): UserNullablePromise {
    return ctx.prisma.user({id: args.id});
  }
}