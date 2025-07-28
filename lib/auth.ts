import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import colors from "tailwindcss/colors";

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
  const userColors = [
    colors.green[500],
    colors.red[500],
    colors.pink[500],
    colors.purple[500],
    colors.yellow[500],
    colors.emerald[500],
    colors.amber[500],
    colors.cyan[500],
    colors.indigo[500],
  ];
  return userColors[Math.floor(Math.random() * userColors.length)];
}
