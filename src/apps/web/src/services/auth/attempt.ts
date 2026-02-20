import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type CreateT = { data: Prisma.AttemptCreateInput };

type FindFirst = { where: Prisma.AttemptWhereInput };

export const AttempServices = {
  create: async (props: CreateT) => await prisma.attempt.create(props),
  findFirst: async (props: FindFirst) => await prisma.attempt.findFirst(props),
};
