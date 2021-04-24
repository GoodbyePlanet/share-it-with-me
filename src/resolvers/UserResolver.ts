import {Arg, Authorized, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware} from "type-graphql";
import {User as PrismaUser} from "@prisma/client";

import {NotFound} from "../middlewares/notFound";
import {User} from "../model/User";
import {Context} from "../context";

@Resolver(User)
export class UserResolver {

  @Authorized("ADMIN", "USER")
  @UseMiddleware(NotFound)
  @Query(() => User, {nullable: true})
  async userById(@Ctx() ctx: Context, @Arg("id") id: string): Promise<PrismaUser | null> {
    return ctx.prisma.user.findUnique({where: {id}});
  }

  @Authorized("ADMIN")
  @Query(() => [User])
  async users(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }

  @FieldResolver()
  async posts(@Root() user: User, @Ctx() ctx: Context) {
    return ctx.prisma.user.findUnique({where: {id: user.id}}).posts();
  }

}