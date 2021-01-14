import {Query} from "./Query";
import {Mutation} from "./mutation";
import {UserPostsResolver} from "./UserPostsResolver";
import {PostAuthorResolver} from "./PostAuthorResolver";

export default {
  Query,
  Mutation,
  User: UserPostsResolver,
  Post: PostAuthorResolver
}