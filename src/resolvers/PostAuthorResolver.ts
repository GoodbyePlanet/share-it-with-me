import {Context} from '../types'
import {UserPromise} from "../generated/prisma-client";

export const PostAuthorResolver = {
  author: (parent: any, _: any, ctx: Context): UserPromise => ctx.prisma.post({id: parent.id}).author()
}