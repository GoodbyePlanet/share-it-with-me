import {Service} from "typedi";
import {PrismaClient, User as PrismaUser, Post as PrismaPost} from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import {UserAlreadyExistsError} from "../errorHandling";
import {APP_SECRET} from "../utils/config";
import {CreateUserInput} from "../resolvers/UserResolver";

const SALT_WORK_FACTOR = 10;
const signJwtToken = (userId: string, role: string): string => {
  return jwt.sign({userId, role}, APP_SECRET!);
}

@Service()
export class UserService {

  async getUsers(prisma: PrismaClient): Promise<Array<PrismaUser>> {
    return prisma.user.findMany();
  }

  async getUserById(id: string, prisma: PrismaClient): Promise<PrismaUser | null> {
    return prisma.user.findUnique({where: {id}});
  }

  async posts(userId: string, prisma: PrismaClient): Promise<Array<PrismaPost>> {
    return prisma.user.findUnique({where: {id: userId}}).posts();
  }

  async createUser(createUserInput: CreateUserInput, prisma: PrismaClient) {
    const password = await bcrypt.hash(createUserInput.password, SALT_WORK_FACTOR);
    const existingUser = await prisma.user.findUnique({where: {email: createUserInput.email}});

    if (existingUser) {
      throw UserAlreadyExistsError;
    }

    const user = await prisma.user.create({data: {...createUserInput, password}});
    return {token: signJwtToken(user.id, user.role), user};
  }

}