import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  where: Prisma.AppVersionWhereInput;
};
export async function getUpdates({ where }: Props) {
  return await prisma.appVersion.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}
