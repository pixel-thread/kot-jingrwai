import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  create: Prisma.BibleVerseCreateInput;
  where: Prisma.BibleVerseWhereUniqueInput;
  update: Prisma.BibleVerseUpdateInput;
};

export async function addVerse({ create, update, where }: Props) {
  return await prisma.bibleVerse.upsert({
    where,
    create,
    update,
    include: { verse: { include: { details: true } } },
  });
}
