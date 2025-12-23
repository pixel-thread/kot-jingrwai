import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  where: Prisma.SongWhereUniqueInput;
};

export async function getUniqueSongs({ where }: Props) {
  return await prisma.song.findUnique({
    where,
    include: {
      paragraphs: { include: { lines: true } },
      metadata: true,
      track: { include: { metadata: true } },
    },
  });
}
