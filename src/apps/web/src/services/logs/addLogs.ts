import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  data: Prisma.LogCreateInput;
};

export async function addLogs({ data }: Props) {
  return await prisma.log.create({ data });
}
