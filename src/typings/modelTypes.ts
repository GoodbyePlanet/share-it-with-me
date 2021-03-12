// import {Prisma, User} from "../generated/prisma-client";
import {User, PrismaClient} from "@prisma/client";
import {Request} from "express";

export interface Context {
  prisma: PrismaClient
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