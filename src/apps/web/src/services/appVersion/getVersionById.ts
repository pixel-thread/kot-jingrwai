import { prisma } from "@/lib/database/prisma";

type Props = {
  id: string;
};

export async function getVersionById({ id }: Props) {
  return prisma.appVersion.findUnique({ where: { id } });
}
