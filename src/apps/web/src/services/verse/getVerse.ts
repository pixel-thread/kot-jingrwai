import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  where: Prisma.DetailsWhereUniqueInput;
};

export async function getVerse({ where }: Props) {
  return await prisma.details.findUnique({
    where,
    include: { verse: true },
  });
}
