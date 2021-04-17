import {Field, ID, ObjectType} from "type-graphql";
import {User} from "./User";

@ObjectType()
export class Post {

  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  title: string;

  @Field(() => String, {nullable: true})
  content: string;

  @Field(() => User)
  author: User;

  @Field(() => [String], {nullable: true})
  tags: [string];
}