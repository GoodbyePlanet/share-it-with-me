// import {Request} from 'express';
// import {IRuleConstructorOptions} from "graphql-shield/dist/types";
// import * as jwt from "jsonwebtoken";
// import {and, not, rule, shield} from "graphql-shield";
//
// import {APP_SECRET} from "../utils/config";
// import {AuthenticationUser, Context} from "../context";
// import {Role} from "../model/User";
//
// const contextualCacheOption = {cache: 'contextual'} as IRuleConstructorOptions;
//
// export const getUser = (request: Request): AuthenticationUser | null => {
//   console.log("INSIDE GET USER", request.get('Authorization'));
//   const authorization = request.get('Authorization');
//
//   if (authorization) {
//     const token = authorization.replace('Bearer ', '');
//
//     try {
//       return jwt.verify(token, APP_SECRET!) as AuthenticationUser;
//     } catch (error: any) {
//       return null;
//     }
//   }
//
//   // User not Authenticated
//   return null;
// }
//
// const isAuthenticated = rule(contextualCacheOption)(async (_, __, ctx: Context) => ctx.user !== null);
//
// const isAdmin = rule(contextualCacheOption)(
//   async (_, __, ctx: Context) => ctx.user?.role === Role.ADMIN);
//
// // const isUser = rule(contextualCacheOption)(
// //   async (_, __, ctx: Context) => ctx.user?.role === Role.USER);
//
// // const createUserInputFieldsRules = inputRule()(
// //   (yup) => {
// //     return yup.object(
// //       {
// //         user: yup.object({
// //           email: yup.string().email('Please use valid email').required(),
// //           password: yup.string().min(6, "Password has to be at least 6 characters long").required()
// //         }),
// //       })
// //   }
// // )
//
// export const permissions = shield({
//   Query: {
//     users: and(isAuthenticated, isAdmin),
//     // userById: and(isAuthenticated, or(isAdmin, isUser)),
//     posts: not(isAuthenticated)
//   },
//   Mutation: {
//     // signup: and(not(isAuthenticated), createUserInputFieldsRules),
//     login: not(isAuthenticated)
//   }
// });