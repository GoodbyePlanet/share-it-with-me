import {Options} from "graphql-yoga";
import {GRAPHQL_ENDPOINT, GRAPHQL_PLAYGROUND, GRAPHQL_SUBSCRIPTIONS, PORT} from "./utils/config";
import {server} from "./server";

export const App = async () => {
  const options: Options = {
    port: process.env.NODE_ENV === "test" ? 0 : PORT,
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions: GRAPHQL_SUBSCRIPTIONS,
    playground: GRAPHQL_PLAYGROUND,
  }

  return await server.start(options, ({port}): void =>
    console.log(`🚀 Server ready at: http://localhost:${port}`));
}