import {GraphQLScalarType} from "graphql";
import {DateTimeResolver} from "graphql-scalars";
import {Container} from "typedi";
import {UserResolver} from "./resolvers/UserResolver";
import {buildSchema} from "type-graphql";
import {PostResolver} from "./resolvers/PostResolver";
import {AuthenticationResolver} from "./resolvers/AuthenticationResolver";
import {Authentication} from "./accessControl/permissions";

export const schema = buildSchema({
  resolvers: [UserResolver, PostResolver, AuthenticationResolver],
  scalarsMap: [{type: GraphQLScalarType, scalar: DateTimeResolver}],
  authChecker: Authentication,
  container: Container,
  emitSchemaFile: {
    path: __dirname + "/schema.gql",
    commentDescriptions: true,
    sortedSchema: false, // by default the printed schema is sorted alphabetically
  },
})
