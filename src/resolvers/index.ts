import {Query} from "./Query";
import {UserPostsResolver} from "./UserPostsResolver";
import {PostAuthorResolver} from "./PostAuthorResolver";
import {signup} from "./mutation/authentication";

export default {
  Query,
  Mutation: {
    signup
  },
  User: UserPostsResolver,
  Post: PostAuthorResolver
}