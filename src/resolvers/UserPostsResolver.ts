import {Context} from "../types";
import {FragmentableArray, Post} from "../generated/prisma-client";

export const UserPostsResolver = {
  posts: (parent: any, _: any, ctx: Context): FragmentableArray<Post> => ctx.prisma.user({id: parent.id}).posts()
}