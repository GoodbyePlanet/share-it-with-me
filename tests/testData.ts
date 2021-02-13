import {prisma} from "../src/generated/prisma-client";

export const createTestData = async () => {
  await prisma.createUser({
    email: "perica@gmail.com",
    username: "Perica",
    password: "$2y$12$8umiIWt7cdGiQediVOwsAesSoxx4MwO5oJXsL2f7o4Haajy49Yp9O",
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
    password: "$2y$12$KxXZtUmO5yqtzAiy7RlfZ.6pa2M8AcTZhHLNEkc8DrqbDSK3Yw4hS",
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
}