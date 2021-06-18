import "reflect-metadata";
import {ApolloServer} from "apollo-server";
import {applyMiddleware} from "graphql-middleware";
import {PrismaClient} from "@prisma/client";

import {PORT} from "./utils/config";
import {schema} from "./schema";
import {formatError} from "./errorHandling";
import {LoggerPlugin} from "./middlewares/logger";

export const App = async (): Promise<void> => {
  const server = new ApolloServer({
    schema: applyMiddleware(await schema),
    formatError,
    context: ({req}) => ({req, prisma: new PrismaClient()}),
    plugins: [LoggerPlugin]
  });

  await server.listen(PORT, (): void =>
    console.log(`🚀 Server ready at: http://localhost:${PORT}`));
}