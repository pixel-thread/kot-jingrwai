import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  where: Prisma.AppVersionWhereInput;
  page?: number;
};
export async function getUpdates({ where, page }: Props) {
  return await prisma.appVersion.findMany({
    where,
    skip: page,
    orderBy: { createdAt: "desc" },
  });
}
