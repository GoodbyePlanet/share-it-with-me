import {ContextParameters} from "graphql-yoga/dist/types";
import {IRuleConstructorOptions} from "graphql-shield/dist/types";
import {AuthenticationUser, Context, UserRole} from "../typings/modelTypes";
import * as jwt from "jsonwebtoken";
import {APP_SECRET} from "../utils/config";
import {and, inputRule, not, or, rule, shield} from "graphql-shield";

const contextualCacheOption = {cache: 'contextual'} as IRuleConstructorOptions;

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

const isAuthenticated = rule(contextualCacheOption)(async (_, __, ctx: Context) => ctx.user !== null);

const isAdmin = rule(contextualCacheOption)(
  async (_, __, ctx: Context) => ctx.user?.role === UserRole.ADMIN);

const isUser = rule(contextualCacheOption)(
  async (_, __, ctx: Context) => ctx.user?.role === UserRole.USER);

const createUserInputFieldsRules = inputRule()(
  (yup) => {
    return yup.object(
      {
        user: yup.object({
          email: yup.string().email('Please use valid email').required(),
          password: yup.string().min(6, "Password has to be at least 6 characters long").required()
        }),
      })
  }
)

export const permissions = shield({
  Query: {
    users: and(isAuthenticated, isAdmin),
    userById: and(isAuthenticated, or(isAdmin, isUser)),
    posts: not(isAuthenticated)
  },
  Mutation: {
    signup: and(not(isAuthenticated), createUserInputFieldsRules),
    login: not(isAuthenticated)
  }
});