import {Field, ID, ObjectType} from "type-graphql";
import {Post} from "./Post";

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

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

  @Field(() => String, {defaultValue: Role.USER})
  role: Role;
}
