import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";
import { getPagination } from "@/utils/pagination";

type Props = {
  where?: Prisma.SongWhereInput;
  page?: string | null;
  orderBy?: Prisma.SongOrderByWithRelationInput;
};

export async function getSongs({ where, page, orderBy }: Props = {}) {
  const { take, skip } = getPagination({ page: page ?? "1" });

  if (!page) {
    return prisma.$transaction([
      prisma.song.findMany({
        where,
        orderBy: orderBy ?? {
          metadata: { number: "asc" },
        },
        include: {
          metadata: true,
          paragraphs: { include: { lines: true } },
          track: { include: { metadata: true } },
        },
      }),
      prisma.song.count({ where }),
    ]);
  }

  return prisma.$transaction([
    prisma.song.findMany({
      where,
      take,
      skip,
      orderBy: orderBy ?? {
        metadata: { number: "asc" },
      },
      include: {
        metadata: true,
        paragraphs: { include: { lines: true } },
        track: { include: { metadata: true } },
      },
    }),
    prisma.song.count({ where }),
  ]);
}
