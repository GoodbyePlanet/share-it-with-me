import {GraphQLScalarType} from "graphql";
import {DateTimeResolver} from "graphql-scalars";
import {UserResolver} from "./resolvers/UserResolver";
import {buildSchema} from "type-graphql";
import {PostResolver} from "./resolvers/PostResolver";
import {AuthenticationResolver} from "./resolvers/AuthenticationResolver";
import {Authentication} from "./accessControl/permissions";

export const schema = buildSchema({
  resolvers: [UserResolver, PostResolver, AuthenticationResolver],
  scalarsMap: [{type: GraphQLScalarType, scalar: DateTimeResolver}],
  authChecker: Authentication
})
