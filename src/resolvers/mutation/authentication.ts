// import * as bcrypt from "bcryptjs";
// import * as jwt from "jsonwebtoken";
// import {AuthenticationResolver} from "../../typings/resolverTypes";
// import {APP_SECRET} from "../../utils/config";
// import {UserNotFoundError, WrongCredentialsError} from "../../validation";
// import {Role} from "../../generated/prisma-client";
//
// // const SALT_WORK_FACTOR = 10;
//
// const signJwtToken = (userId: string, role: Role): string => {
//   return jwt.sign({userId, role}, APP_SECRET!);
// }
//
// export const Authentication: AuthenticationResolver = {
//   login: async (_, {user: {email, password}}, ctx) => {
//     console.log("CONTEXT ", ctx);
//     const user = await ctx.prisma.user({email});
//     // const user = await ctx.prisma.
//     if (!user) {
//       return new UserNotFoundError;
//     }
//
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return new WrongCredentialsError;
//     }
//
//     return {token: signJwtToken(user.id, user.role), user}
//   },
//   // signup: async (_, {user: userInput}, ctx) => {
//   //   const password = await bcrypt.hash(userInput.password, SALT_WORK_FACTOR);
//   //   const existingUser = await ctx.prisma.$exists.user({email: userInput.email});
//   //
//   //   if (existingUser) {
//   //     return new UserAlreadyExistsError;
//   //   }
//   //
//   //   const user = await ctx.prisma.createUser({...userInput, password});
//   //   return {token: signJwtToken(user.id, user.role), user}
//   // }
// }