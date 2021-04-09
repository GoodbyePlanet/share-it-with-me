import {join} from "path";
import {PrismaClient} from "@prisma/client";
import {nanoid} from "nanoid";
import {execSync} from "child_process";
import {Client} from "pg";

export const prismaTestContext = () => {
  const prismaBinary = join(__dirname, '..', '..', 'node_modules', '.bin', 'prisma');
  let schema = "";
  let databaseUrl = "";
  let prismaClient: null | PrismaClient = null;

  return {
    async before(): Promise<PrismaClient> {
      // Generate a unique schema identifier for every test context
      schema = `test_${nanoid()}`;
      databaseUrl = `postgres://prisma:prisma@localhost:5432/testing?schema=${schema}`;

      process.env.DATABASE_URL = databaseUrl;

      // Run the migrations to ensure our schema has the required structure
      // The --create-only command allows you to create a migration without applying it
      execSync(`${prismaBinary} migrate dev --create-only --preview-feature`, {
        env: {
          ...process.env,
          DATABASE_URL: databaseUrl,
        },
      });

      // Construct a new Prisma Client connected to the generated Postgres schema
      prismaClient = new PrismaClient();

      return prismaClient;
    },
    async after(): Promise<void> {
      const client = new Client({connectionString: databaseUrl});

      await client.connect();
      await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
      await client.end();

      await prismaClient?.$disconnect();
    },
  }
}