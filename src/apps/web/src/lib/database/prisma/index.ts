import { PrismaClient } from "./generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn"],
    errorFormat: "pretty",
    transactionOptions: {
      maxWait: 600000, // 10 minutes
      timeout: 600000, // 10 minutes
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
