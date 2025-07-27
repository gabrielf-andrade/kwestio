import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 32,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          // Modify the user object before it is created
          return {
            data: {
              ...user,
              image: generateRandomColor(),
            },
          };
        },
      },
    },
  },
});

function generateRandomColor(): string {
  const colors = ["red", "blue", "green", "purple", "orange", "pink", "yellow", "indigo", "teal", "cyan"];
  return colors[Math.floor(Math.random() * colors.length)];
}
