import { faker } from "@faker-js/faker";
import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

const runSeed = async () => {
  const otherUsers = await prisma.user.findMany();
  let myUser = await prisma.user.findUnique({ where: { email: "gabriel@biscoine.com" } });
  if (!myUser)
    myUser = {
      id: "dBUi4IGRPJHVznO7SKgfpwEtdE0lQPnZ",
      name: "Gabriel",
      email: "gabriel@biscoine.com",
      emailVerified: false,
      image: "oklch(71.5% 0.143 215.221)",
      createdAt: new Date("2025-07-28T17:19:28.968Z"),
      updatedAt: new Date("2025-07-28T17:19:28.968Z"),
    };
  await resetDB();
  process.stdout.write("Users ready...");
  printCheckMark();

  process.stdout.write("Generating events...");
  const event = await prisma.event.create({
    data: {
      ownerId: myUser?.id,
      displayName: faker.commerce.productName(),
      shortDescription: faker.lorem.sentence(),
      slug: faker.lorem.slug(),
      createdAt: faker.date.recent(),
      participants: {
        createMany: {
          data: Array.from({ length: 10 }).map((_, index) => ({
            userId: otherUsers[index % otherUsers.length].id,
          })),
        },
      },
    },
  });
  printCheckMark();

  process.stdout.write("Generating questions...");
  for (let i = 0; i < 30; i++) {
    await prisma.question.create({
      data: {
        eventId: event.id,
        authorId: otherUsers[i % otherUsers.length].id,
        body: faker.lorem.paragraph(),
        isPinned: faker.datatype.boolean({ probability: 0.2 }),
        isResolved: faker.datatype.boolean({ probability: 0.25 }),
        createdAt: faker.date.recent(),
        upvotes: {
          createMany: {
            data: Array.from({
              length: faker.number.int({
                min: 0,
                max: 8,
              }),
            }).map((_, index) => ({
              authorId: otherUsers[index % otherUsers.length].id,
            })),
          },
        },
      },
    });
  }
  printCheckMark();

  process.stdout.write("Generating polls...");
  const polls = await prisma.poll.createManyAndReturn({
    data: [
      {
        eventId: event.id,
        body: faker.lorem.paragraph(),
        createdAt: faker.date.recent(),
        isLive: true,
      },
      {
        eventId: event.id,
        body: faker.lorem.paragraph(),
        createdAt: faker.date.recent(),
        isLive: false,
      },
    ],
  });

  // generate the options and votes for the polls
  const optionVotes = [
    otherUsers.slice(0, 4).map((usr) => usr.id), // first option
    otherUsers.slice(4, 6).map((usr) => usr.id), // second option
    otherUsers.slice(6, 10).map((usr) => usr.id), // third option
    [], // fourth option
  ] as const;

  for (const poll of polls) {
    // option per poll
    for (let i = 0; i < 4; i++) {
      await prisma.pollOption.create({
        data: {
          pollId: poll.id,
          body: faker.lorem.word(3),
          index: i,
          votes: {
            createMany: {
              data: Array.from({ length: optionVotes[i].length }).map((_, userIndex) => ({
                authorId: optionVotes[i][userIndex],
                pollId: poll.id,
              })),
            },
          },
        },
      });
    }
  }
  printCheckMark();

  console.log("Seeding complete 🎉");
};

const resetDB = async () => {
  process.stdout.write("Resetting database...");

  await prisma.event.deleteMany();
  await prisma.poll.deleteMany();
  await prisma.question.deleteMany();

  printCheckMark();
};

const printCheckMark = () => process.stdout.write("✅\n");

runSeed()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => async () => {
    await prisma.$disconnect();
  });
