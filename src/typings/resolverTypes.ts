// import {GraphQLResolveInfo} from "graphql";
// import {Post, User} from "@prisma/client";
// import {AuthResponse, Context, CreateUserInput, LoginUserInput} from "./modelTypes";
//
// type ResolverFn<TResult, TParent, TArgs, TContext> = (
//   parent: TParent,
//   args: TArgs,
//   context: TContext,
//   info?: GraphQLResolveInfo
// ) => Promise<TResult> | TResult;
//
// export type ResolversParent = {
//   Query: {};
//   Mutation: {};
//   User: User;
//   Post: Post;
//   AuthResponse: AuthResponse;
//   LoginUserInput: LoginUserInput;
//   CreateUserInput: CreateUserInput;
// }
//
// export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
//   ResolverFn<TResult, TParent, TContext, TArgs>;
//
// export type QueryResolver<ParentType extends ResolversParent['Query'] = ResolversParent['Query'],
//   ContextType = Context> = {
//   users: Resolver<Array<ResolversParent['User']>, ParentType, User, ContextType>;
//   userById: Resolver<User | {}, ParentType, User, ContextType>;
//   posts: Resolver<Array<ResolversParent['Post']>, ParentType, Post, ContextType>;
// }
//
// export type PostAuthorResolver<ParentType extends ResolversParent['Post'] = ResolversParent['Post'],
//   ContextType = Context> = {
//   author: Resolver<User | {}, ParentType, User, ContextType>;
// }
//
// export type UserPostsResolver<ParentType extends ResolversParent['User'] = ResolversParent['User'],
//   ContextType = Context> = {
//   posts: Resolver<Array<ResolversParent['Post']>, ParentType, Post, ContextType>;
// }
//
// export type AuthenticationResolver<ParentType extends ResolversParent['Mutation'] = ResolversParent['Mutation'],
//   ContextType = Context> = {
//   login: Resolver<Promise<ResolversParent['AuthResponse']>, ParentType, LoginUserInput, ContextType>;
//   signup: Resolver<Promise<ResolversParent['AuthResponse']>, ParentType, CreateUserInput, ContextType>;
// }