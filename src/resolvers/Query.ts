import {Context} from "../types";
import {FragmentableArray, User, UserNullablePromise} from "../generated/prisma-client";

export const Query = {
  users(_: any, __: any, ctx: Context): FragmentableArray<User> {
    let users = ctx.prisma.users();
    users.then(value => console.log("users ", value));
    return users;
  },
  userById(_: any, args: any, ctx: Context): UserNullablePromise {
    return ctx.prisma.user({id: args.id});
  }
}