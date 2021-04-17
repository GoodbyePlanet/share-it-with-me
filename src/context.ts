import {PrismaClient} from '@prisma/client'
import {Request} from 'express';

import {Role, User} from "./model/User";

// const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient,
  req: Request
  user?: User

}

// export const context: Context = {
//   prisma
// }

export interface AuthenticationUser {
  userId: string
  role: Role
}
