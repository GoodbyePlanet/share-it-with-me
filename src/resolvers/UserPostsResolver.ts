import {UserPostsResolver} from "../typings/resolverTypes";

export const UserPosts: UserPostsResolver = {
  posts: (parent, _, ctx) => ctx.prisma.user({id: parent.id}).posts()
}