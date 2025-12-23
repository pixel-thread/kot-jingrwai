import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  where: Prisma.AppVersionWhereUniqueInput;
};
export async function deleteUpdate({ where }: Props) {
  return await prisma.appVersion.delete({ where });
}
