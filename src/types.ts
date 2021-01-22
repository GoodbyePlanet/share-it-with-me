import {FragmentableArray, Post, Prisma, User, UserNullablePromise, UserPromise} from "./generated/prisma-client";
import {Request} from "express";
import {GraphQLResolveInfo} from "graphql";

// export type Resolver<TResult, TParent, TArgs, TContext> = {
//   [key: string]: ResolverFn<TResult, TParent, TArgs, TContext>;
// }

type ResolverFn<TResult, TParent, TArgs, TContext> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type ResolversParent = {
  Query: {};
  Mutation: {};
  User: User;
  Post: Post;
  AuthResponse: AuthResponse;
  LoginUserInput: LoginUserInput;
  CreateUserInput: CreateUserInput;
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  ResolverFn<TResult, TParent, TContext, TArgs>;

export type QueryResolver<ParentType extends ResolversParent['Query'] = ResolversParent['Query'],
  ContextType = Context> = {
  users: Resolver<FragmentableArray<ResolversParent['User']>, ParentType, User, ContextType>;
  userById: Resolver<UserNullablePromise, ParentType, User, ContextType>;
  posts: Resolver<FragmentableArray<ResolversParent['Post']>, ParentType, Post, ContextType>;
}

export type PostAuthorResolver<ParentType extends ResolversParent['Post'] = ResolversParent['Post'],
  ContextType = Context> = {
  author: Resolver<UserPromise, ParentType, User, ContextType>;
}

export type UserPostsResolver<ParentType extends ResolversParent['User'] = ResolversParent['User'],
  ContextType = Context> = {
  posts: Resolver<FragmentableArray<ResolversParent['Post']>, ParentType, Post, ContextType>;
}

export type AuthenticationResolver<ParentType extends ResolversParent['Mutation'] = ResolversParent['Mutation'],
  ContextType = Context> = {
  login: Resolver<Promise<ResolversParent['AuthResponse']>, ParentType, LoginUserInput, ContextType>;
  signup: Resolver<Promise<ResolversParent['AuthResponse']>, ParentType, CreateUserInput, ContextType>;
}

export interface Context {
  prisma: Prisma
  request: Request
  user?: User
}

export interface AuthResponse {
  token: string
  user: User
}

interface UserInput {
  email: string
  username: string
  password: string
}

export interface CreateUserInput {
  user: UserInput
}

export interface LoginUserInput {
  user: Omit<UserInput, 'username'>
}

export interface AuthenticationUser {
  userId: string
  role: UserRole
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}