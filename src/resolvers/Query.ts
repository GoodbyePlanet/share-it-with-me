import {Context} from "../types";

export const Query = {
  users(_: any, __: any, ctx: Context) {
    return ctx.prisma.users();
  }
}