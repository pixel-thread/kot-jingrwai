import { prisma } from "@/lib/database/prisma";

export async function getBibleVerse() {
  return await prisma.bibleVerse.findFirst({
    take: 1,
    orderBy: { createdAt: "asc" },
    include: {
      verse: { include: { details: true } },
    },
  });
}
