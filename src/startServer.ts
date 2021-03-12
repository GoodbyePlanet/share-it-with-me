import {GraphQLServer, Options} from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import {GRAPHQL_ENDPOINT, GRAPHQL_PLAYGROUND, GRAPHQL_SUBSCRIPTIONS, PORT} from "./utils/config";
import resolvers from "./resolvers";
import {getUser} from "./accessControl/authentication";

export const App = async () => {
  const server = new GraphQLServer({
    typeDefs: ['./src/schema.graphql'],
    resolvers,
    // middlewares: [permissions],
    context: ({ request }) => ({...request, prisma: new PrismaClient(), user: getUser(request)})
  });

  const options: Options = {
    port: process.env.NODE_ENV === "test" ? 0 : PORT,
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions: GRAPHQL_SUBSCRIPTIONS,
    playground: GRAPHQL_PLAYGROUND,
  }

  return await server.start(options, ({port}): void =>
    console.log(`🚀 Server ready at: http://localhost:${port}`));
}