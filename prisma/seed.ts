import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const pero = await prisma.user.upsert({
    where: {email: 'pero@prisma.io'},
    update: {},
    create: {
      email: 'pero@prisma.io',
      username: 'Pero',
      role: 'USER',
      password: '$2y$12$8umiIWt7cdGiQediVOwsAesSoxx4MwO5oJXsL2f7o4Haajy49Yp9O',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'Some content',
          tags: ['prisma', 'graphql'],
        },
      },
    },
  });

  const jovica = await prisma.user.upsert({
    where: {email: 'jovica@prisma.io'},
    update: {},
    create: {
      email: 'jovica@prisma.io',
      username: 'Jovica',
      role: 'ADMIN',
      password: '$2y$12$KxXZtUmO5yqtzAiy7RlfZ.6pa2M8AcTZhHLNEkc8DrqbDSK3Yw4hS',
      posts: {
        create: [
          {
            title: 'Git essentials',
            content: 'Some awesome content for GIT beginners',
            tags: ['git', 'github'],
          },
          {
            title: 'Java introduction',
            content: 'Some content on Java',
            tags: ['intro', 'java'],
          },
        ],
      },
    },
  });

  console.log({pero, jovica})
}

seed()
  .catch(_ => process.exit(1))
  .finally(async () => await prisma.$disconnect());