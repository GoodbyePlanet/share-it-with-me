import 'reflect-metadata';
import {Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {Post as PrismaPost, User as PrismaUser} from "@prisma/client";

import {Post} from "../model/Post";
import {Context} from "../context";

@Resolver(Post)
export class PostResolver {

  @Query(() => [Post])
  async posts(@Ctx() ctx: Context): Promise<Array<PrismaPost> | null> {
    return ctx.prisma.post.findMany();
  }

  @FieldResolver()
  async author(@Root() post: Post, @Ctx() ctx: Context): Promise<PrismaUser | null> {
    return ctx.prisma.post.findUnique({where: {id: post.id}}).author();
  }

}