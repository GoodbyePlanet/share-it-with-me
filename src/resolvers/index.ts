import {Query} from "./Query";
import {UserPostsResolver} from "./UserPostsResolver";
import {PostAuthorResolver} from "./PostAuthorResolver";

export default {
  Query,
  User: UserPostsResolver,
  Post: PostAuthorResolver
}