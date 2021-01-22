import {QueryResolver} from "../types";

export const Query: QueryResolver = {
  users: (_, __, ctx) => ctx.prisma.users(),
  userById: (_, {id}, ctx) => ctx.prisma.user({id}),
  posts: (_, __, ctx) => ctx.prisma.posts()
}