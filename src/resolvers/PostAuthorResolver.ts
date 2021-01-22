import {PostAuthorResolver} from '../types'

export const PostAuthor: PostAuthorResolver = {
  author: (parent, _, ctx) => ctx.prisma.post({id: parent.id}).author()
}