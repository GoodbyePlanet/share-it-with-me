import {GraphQLServer, Options} from "graphql-yoga";
import {prisma} from "./generated/prisma-client";
import {GRAPHQL_ENDPOINT, GRAPHQL_PLAYGROUND, GRAPHQL_SUBSCRIPTIONS, PORT} from "./utils/config";
import resolvers from "./resolvers";

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({...req, prisma})
});

const options: Options = {
  port: PORT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: GRAPHQL_SUBSCRIPTIONS,
  playground: GRAPHQL_PLAYGROUND,
}

// noinspection JSIgnoredPromiseFromCall
server.start(options, ({port}): void =>
  console.log(`Server is running on http://localhost:${port}`));