import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type CreateT = { data: Prisma.AccountLockCreateInput };
type FindFirst = { where: Prisma.AccountLockWhereInput };

export const AccountLockServices = {
  create: async (props: CreateT) => await prisma.accountLock.create(props),
  findFirst: async (props: FindFirst) => await prisma.accountLock.findFirst(props),
};
