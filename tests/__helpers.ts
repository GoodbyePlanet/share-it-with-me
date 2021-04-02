import {PrismaClient} from '@prisma/client'
import {execSync} from 'child_process'
import getPort, {makeRange} from 'get-port'
import {GraphQLClient} from 'graphql-request'
import {nanoid} from 'nanoid'
import {join} from 'path'
import {Client} from 'pg'
// import { db } from '../api/db'
// import { server } from '../api/server'
// import {App as server} from "../src/startServer";
import {Options} from "graphql-yoga";
import {Server as HttpServer} from "http";
import {server} from "../src/server";

const db = new PrismaClient();

export type TestContext = {
  client: GraphQLClient
  db: PrismaClient
}

export function createTestContext(): TestContext {
  let ctx = {} as TestContext
  const graphqlCtx = graphqlTestContext()
  const prismaCtx = prismaTestContext()


  beforeEach(async () => {
    const client = await graphqlCtx.before()
    const db = await prismaCtx.before()

    Object.assign(ctx, {
      client,
      db,
    })
  })

  afterEach(async () => {
    await graphqlCtx.after()
    await prismaCtx.after()
  })

  return ctx
}

function graphqlTestContext() {
  let serverInstance: HttpServer | null;

  return {
    async before() {
      const port = await getPort({port: makeRange(6000, 8000)});
      const options: Options = {
        port,
        endpoint: '/graphql'
      }

      console.log("PORT", port);

      serverInstance = await server.start(options);

      serverInstance.on('close', async () => {
        await db.$disconnect();
      });

      return new GraphQLClient(`http://localhost:${port}/graphql`)
    },
    async after() {
      console.log("INSIDE AFTER OF GRAPHQL TEXT CONTEXT");
      serverInstance?.close();
    },
  }
}

function prismaTestContext() {
  const prismaBinary = join(__dirname, '..', 'node_modules', '.bin', 'prisma')
  let schema = ''
  let databaseUrl = ''
  let prismaClient: null | PrismaClient = null

  return {
    async before() {
      // Generate a unique schema identifier for this test context
      schema = `test_${nanoid()}`
      // Generate the pg connection string for the test schema
      databaseUrl = `postgres://prisma:prisma@localhost:5432/testing?schema=${schema}`

      // Set the required environment variable to contain the connection string
      // to our database test schema
      process.env.DATABASE_URL = databaseUrl

      // Run the migrations to ensure our schema has the required structure
      // The --create-only command allows you to create a migration without applying it
      execSync(`${prismaBinary} migrate dev --create-only --preview-feature`, {
        env: {
          ...process.env,
          DATABASE_URL: databaseUrl,
        },
      })

      // Construct a new Prisma Client connected to the generated Postgres schema
      prismaClient = new PrismaClient()

      return prismaClient
    },
    async after() {
      // Drop the schema after the tests have completed
      const client = new Client({
        connectionString: databaseUrl,
      })
      await client.connect()
      await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
      await client.end()

      // Release the Prisma Client connection
      await prismaClient?.$disconnect()
    },
  }
}