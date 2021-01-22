import {UserPostsResolver} from "../types";

export const UserPosts: UserPostsResolver = {
  posts: (parent, _, ctx) => ctx.prisma.user({id: parent.id}).posts()
}