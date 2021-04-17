import {Request} from 'express';
import {AuthChecker} from "type-graphql";
import * as jwt from "jsonwebtoken";

import {AuthenticationUser, Context} from "../context";
import {APP_SECRET} from "../utils/config";

export const Authentication: AuthChecker<Context> = ({context}, roles) => {
  const user = getUser(context.req);

  if (user) {
    return hasPermission(roles, user.role.toString());
  }

  return false;
};

const getUser = (request: Request): AuthenticationUser | null => {
  const authorization = request.get('Authorization');

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

const hasPermission = (roles: string[], userRole: string): boolean => roles.includes(userRole);