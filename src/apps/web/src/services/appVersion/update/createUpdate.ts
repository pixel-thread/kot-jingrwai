import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  data: Prisma.AppVersionCreateInput;
};

export async function createUpdate({ data }: Props) {
  // Set all active updates to inactive
  await prisma.appVersion.updateMany({
    where: { status: "ACTIVE" },
    data: { status: "INACTIVE" },
  });

  return await prisma.appVersion.create({ data });
}
