import {QueryResolver} from "../typings/resolverTypes";

export const Query: QueryResolver = {
  users: (_, __, ctx) => ctx.prisma.user.findMany(),
  userById: (_, {id}, ctx) => ctx.prisma.user.findUnique({where: {id}}),
  posts: (_, __, ctx) => ctx.prisma.post.findMany()
}