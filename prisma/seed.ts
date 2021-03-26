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
      password: '$2y$10$bBTAQ16zOlAOks964dzPnufFu8yZ1jNX4NOeNdxJ8a.S2yy0hzW6G',
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
      password: '$2y$10$FrvIQ92.gA0rc9OjnZVkku8ZeRjP0duL86Pb.kVXsJejmwgdVNkG.',
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