import {PrismaClient} from '@prisma/client'
import {GraphQLClient} from 'graphql-request'
import {graphqlTestContext} from "./graphqlTestContext";
import {prismaTestContext} from "./prismaTestContext";

export type TestContext = {
  client: GraphQLClient
  db: PrismaClient
}

export const createTestContext = (port: number): TestContext => {
  let context = {} as TestContext;
  const graphqlContext = graphqlTestContext(port);
  const prismaContext = prismaTestContext();


  beforeEach(async (): Promise<void> => {
    const client = await graphqlContext.before();
    const db = await prismaContext.before();

    Object.assign(context, {
      client,
      db,
    });
  });

  afterEach(async (): Promise<void> => {
    await graphqlContext.after();
    await prismaContext.after();
  })

  return context;
}