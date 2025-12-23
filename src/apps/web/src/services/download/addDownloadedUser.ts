import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  create: Prisma.DownloadUsersCreateInput;
  update: Prisma.DownloadUsersUpdateInput;
  where: Prisma.DownloadUsersWhereUniqueInput;
};

export async function addDownloadedUser({ create, update, where }: Props) {
  return await prisma.downloadUsers.upsert({
    where,
    update,
    create,
  });
}
