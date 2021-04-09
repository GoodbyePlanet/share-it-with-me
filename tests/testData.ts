import {PrismaClient} from '@prisma/client';
import {TestContext} from "./testSetup/testContext";

const prisma = new PrismaClient();

export const createUsers = async (context: TestContext) => {
  await context.db.user.create({
    data: {
      id: "user-id-1",
      email: "perica@gmail.com",
      username: "Perica",
      password: "$2a$10$P9unxIUzSMkanXPkZ2sIAOaXumkFRhSNj4V7LkxpMUE9H358dfYJC",
      role: "ADMIN"
    }
  });

  await context.db.user.create({
    data: {
      id: "user-id-2",
      email: "jovica@gmail.com",
      username: "Jovica",
      password: "$2a$10$P9unxIUzSMkanXPkZ2sIAOaXumkFRhSNj4V7LkxpMUE9H358dfYJC"
    }
  });
};

export const createPosts = async (context: TestContext) => {
  await context.db.post.create({
    data: {
      id: "post-id-1",
      title: "NodeJS in Action",
      content: "Some awesome content...",
      tags: {
        set: ["NodeJS"]
      },
      author: {
        create:
          {
            email: "postemail@gmail.com",
            password: "password",
            username: "PostUsername"
          }
      }
    }
  });

  await prisma.post.create({
    data: {
      id: "post-id-2",
      title: "Java in Action",
      content: "Some awesome content on Java programming language...",
      tags: {
        set: ["Java"]
      },
      author: {
        create:
          {
            email: "postemailjava@gmail.com",
            password: "password",
            username: "PostUsername"
          }
      }
    }
  });
};

export const cleanPosts = async (): Promise<void> => {
  await prisma.post.delete({where: {id: "post-id-1"}});
  await prisma.post.delete({where: {id: "post-id-2"}});
}

// export const cleanAuth = async (): Promise<void> => {
//   await prisma.deleteUser({email: "testuser@gmail.com"})
// }
//
// export const cleanUsers = async (): Promise<void> => {
//   await prisma.deleteUser({id: "user-id-1"});
//   await prisma.deleteUser({id: "user-id-2"});
// }