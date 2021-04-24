import {Field, ID, ObjectType} from "type-graphql";
import {Post} from "./Post";

@ObjectType()
export class User {

  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date

  @Field()
  email: string;

  @Field()
  username: string;

  @Field(() => [Post], {nullable: true})
  posts: [Post] | null

  @Field(() => String)
  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}