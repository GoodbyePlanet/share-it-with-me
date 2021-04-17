// import resolvers from "./resolvers";
// import {getUser, permissions} from "./accessControl/authentication";
// import {PrismaClient} from "@prisma/client";
//
// export const server = new GraphQLServer({
//   typeDefs: ['./src/schema.graphql'],
//   resolvers,
//   middlewares: [permissions],
//   context: ({request}) => ({...request, prisma: new PrismaClient(), user: getUser(request)})
// });
