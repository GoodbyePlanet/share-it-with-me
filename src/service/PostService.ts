import {Post, PrismaClient, User as PrismaUser} from "@prisma/client";
import {Service} from "typedi";

@Service()
export class PostService {

  async getPosts(prisma: PrismaClient): Promise<Array<Post>> {
    return prisma.post.findMany();
  }

  async author(postId: string, prisma: PrismaClient): Promise<PrismaUser | null> {
    return prisma.post.findUnique({where: { id: postId }}).author();
  }

}