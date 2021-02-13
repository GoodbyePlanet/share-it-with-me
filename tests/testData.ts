import {prisma} from "../src/generated/prisma-client";

export const createTestData = async () => {
  await prisma.createUser({
    id: "user-id-1",
    email: "perica@gmail.com",
    username: "Perica",
    password: "$2a$10$P9unxIUzSMkanXPkZ2sIAOaXumkFRhSNj4V7LkxpMUE9H358dfYJC",
    role: "ADMIN"
  });

  await prisma.createUser({
    id: "user-id-2",
    email: "jovica@gmail.com",
    username: "Jovica",
    password: "$2a$10$P9unxIUzSMkanXPkZ2sIAOaXumkFRhSNj4V7LkxpMUE9H358dfYJC"
  });
};

export const createPostTest = async () => {
  await prisma.createPost({
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
  });

  await prisma.createPost({
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
  });
};

export const cleanPostTest = async (): Promise<void> => {
  await prisma.deletePost({id: "post-id-1"});
  await prisma.deletePost({id: "post-id-2"});
}

export const cleanAuthTest = async (): Promise<void> => {
  await prisma.deleteUser({email: "testuser@gmail.com"})
}

export const cleanTestData = async (): Promise<void> => {
  await prisma.deleteUser({id: "user-id-1"});
  await prisma.deleteUser({id: "user-id-2"});
}