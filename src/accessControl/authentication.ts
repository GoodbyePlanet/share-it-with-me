import {ContextParameters} from "graphql-yoga/dist/types";
import {IRuleConstructorOptions} from "graphql-shield/dist/types";
import {AuthenticationUser, Context, UserRole} from "../types";
import * as jwt from "jsonwebtoken";
import {APP_SECRET} from "../utils/config";
import {and, not, or, rule, shield} from "graphql-shield";

const cacheOption = {cache: 'contextual'} as IRuleConstructorOptions;

export const getUser = (ctx: ContextParameters): AuthenticationUser | null => {
  const authorization = ctx.request.get('Authorization');

  if (authorization) {
    const token = authorization.replace('Bearer ', '');

    try {
      return jwt.verify(token, APP_SECRET!) as AuthenticationUser;
    } catch (error: any) {
      return null;
    }
  }

  // User not Authenticated
  return null;
}

const isAuthenticated = rule(cacheOption)(async (_: any, __: any, ctx: Context) => ctx.user !== null);

const isAdmin = rule(cacheOption)(
  async (_: any, __: any, ctx: Context) => ctx.user?.role === UserRole.ADMIN);

const isUser = rule(cacheOption)(
  async (_: any, __: any, ctx: Context) => ctx.user?.role === UserRole.USER);


export const permissions = shield({
  Query: {
    users: and(isAuthenticated, isAdmin),
    userById: and(isAuthenticated, or(isAdmin, isUser))
  },
  Mutation: {
    signup: not(isAuthenticated),
    login: not(isAuthenticated)
  }
});