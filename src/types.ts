import {Prisma, User} from "./generated/prisma-client";

export interface Context {
  prisma: Prisma
  request: any
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