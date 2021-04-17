import {Authorized, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {User} from "../model/User";
import {Context} from "../context";

@Resolver(User)
export class UserResolver {

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