import {GraphQLServer, Options} from "graphql-yoga";
import {GRAPHQL_ENDPOINT, GRAPHQL_PLAYGROUND, GRAPHQL_SUBSCRIPTIONS, PORT} from "./utils/config";

const typeDefs = `
type Query {
  character: String!
}
`

// Resolvers
const resolvers = {
  Query: {
    character: () => `The force is strong with this API!`
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
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