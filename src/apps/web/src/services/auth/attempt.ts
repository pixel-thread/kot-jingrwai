import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type CreateT = { data: Prisma.AttemptCreateInput };

type FindFirst = { where: Prisma.AttemptWhereInput };

export const AttempServices = {
  create: async (props: CreateT) => await prisma.attempt.create(props),
  findFirst: async (props: FindFirst) => await prisma.attempt.findFirst(props),
  findMany: async (props: FindFirst) => await prisma.attempt.findMany(props),
  count: async (props: FindFirst) => await prisma.attempt.count(props),
  deleteMany: async (props: FindFirst) => await prisma.attempt.deleteMany(props),
};
