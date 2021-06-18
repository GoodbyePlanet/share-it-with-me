import {PrismaClient} from "@prisma/client";
import {Service} from "typedi";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import {UserLoginInput} from "../resolvers/AuthenticationResolver";
import {UserNotFoundError, WrongCredentialsError} from "../errorHandling";
import {APP_SECRET} from "../utils/config";

const signJwtToken = (userId: string, role: string) => jwt.sign({userId, role}, APP_SECRET!);

@Service()
export class AuthenticationService {

  async login(loginInput: UserLoginInput, prisma: PrismaClient) {
    const user = await prisma.user.findUnique({where: {email: loginInput.email}});

    if (!user) {
      throw UserNotFoundError;
    }

    const isValid = await bcrypt.compare(loginInput.password, user.password);

    if (!isValid) {
      throw WrongCredentialsError;
    }

    return {token: signJwtToken(user.id, user.role), user};
  }
}