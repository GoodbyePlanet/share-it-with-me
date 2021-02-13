import {prisma} from "../src/generated/prisma-client";

export const createTestData = async () => {
  await prisma.createUser({
    email: "perica@gmail.com",
    username: "Perica",
    password: "$2a$10$P9unxIUzSMkanXPkZ2sIAOaXumkFRhSNj4V7LkxpMUE9H358dfYJC",
    role: "ADMIN",
    posts: {
      create: [
        {
          title: "NodeJS in Action",
          content: "Some awesome content...",
          tags: {
            set: ["NodeJS"]
          }
        }
      ]
    }
  });

  await prisma.createUser({
    email: "jovica@gmail.com",
    username: "Jovica",
    password: "$2a$10$P9unxIUzSMkanXPkZ2sIAOaXumkFRhSNj4V7LkxpMUE9H358dfYJC",
    posts: {
      create: [
        {
          title: "Git essentials",
          content: "Awesome content for GIT...",
          tags: {
            set: ["git", "github"]
          }
        }
      ]
    }
  });
};

export const cleanTestData = async (): Promise<void> => {
  await prisma.deleteManyPosts();
  await prisma.deleteManyUsers();
}