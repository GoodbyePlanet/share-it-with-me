// import {Server as HttpServer} from "http";
// import {Options} from "graphql-yoga";
// import {server} from "../../src/server";
// import {GraphQLClient} from "graphql-request";
// import {PrismaClient} from "@prisma/client";
//
// const db = new PrismaClient();
//
// export const graphqlTestContext = (port: number) => {
//   let serverInstance: HttpServer | null;
//
//   return {
//     async before(): Promise<GraphQLClient> {
//       const options: Options = {
//         port,
//         endpoint: '/graphql'
//       };
//
//       try {
//         serverInstance = await server.start(options);
//         serverInstance.on('close', async () => {
//           await db.$disconnect();
//         });
//       } catch (err: any) {
//         console.log(err);
//       }
//
//       return new GraphQLClient(`http://localhost:${options.port}/graphql`);
//     },
//     async after(): Promise<void> {
//       await serverInstance?.close();
//     },
//   }
// }