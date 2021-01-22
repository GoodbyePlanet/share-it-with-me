import {Query} from "./Query";
import {PostAuthor} from "./PostAuthorResolver";
import {UserPosts} from "./UserPostsResolver";
import {Mutation} from "./mutation";

export default {
  Query,
  Mutation,
  User: UserPosts,
  Post: PostAuthor
}