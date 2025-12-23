import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  where: Prisma.AppVersionWhereUniqueInput;
};

export async function getUniqueUpdate({ where }: Props) {
  return await prisma.appVersion.findUnique({ where });
}
