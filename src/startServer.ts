import "reflect-metadata";
import {ApolloServer} from "apollo-server";
import {PrismaClient} from "@prisma/client";
import {applyMiddleware} from "graphql-middleware";

import {PORT} from "./utils/config";
import {schema} from "./schema";

export const App = async (): Promise<void> => {

  const server = new ApolloServer({
    schema: applyMiddleware(await schema),
    context: ({req}) => ({req, prisma: new PrismaClient()})
  });

  await server.listen(PORT, (): void =>
    console.log(`🚀 Server ready at: http://localhost:${PORT}`));
}