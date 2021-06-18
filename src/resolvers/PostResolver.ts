import 'reflect-metadata';
import {Post as PrismaPost, User as PrismaUser, PrismaClient} from "@prisma/client";
import {Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {Service} from "typedi";

import {Post} from "../model/Post";
import {PostService} from "../service/PostService";

@Service()
@Resolver(Post)
export class PostResolver {

  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async posts(@Ctx("prisma") prisma: PrismaClient): Promise<Array<PrismaPost> | null> {
    return this.postService.getPosts(prisma);
  }

  @FieldResolver()
  async author(@Root() post: Post, @Ctx("prisma") prisma: PrismaClient): Promise<PrismaUser | null> {
    return this.postService.author(post.id, prisma);
  }

}