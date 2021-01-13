import {Context} from "../types";
import {FragmentableArray, Post, User, UserNullablePromise} from "../generated/prisma-client";

export const Query = {
  users: (_: any, __: any, ctx: Context): FragmentableArray<User> => ctx.prisma.users(),
  userById: (_: any, {id}: any, ctx: Context): UserNullablePromise => ctx.prisma.user({id}),
  posts: (_: any, __: any, ctx: Context): FragmentableArray<Post> => ctx.prisma.posts()
}