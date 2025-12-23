import { prisma } from "@/lib/database/prisma";
import { SongSchema } from "@/utils/validation/songs";
import z from "zod";

type Props = {
  data: z.infer<typeof SongSchema>;
};

export async function updateSong({ data }: Props) {
  return await prisma.$transaction(async (tx) => {
    const { id: songId, metadataId, paragraphs, metadata } = data;

    // 1. Update SongMetadata
    await tx.songMetadata.update({
      where: { id: metadataId },
      data: {
        number: metadata.number,
        oldNumber: metadata.oldNumber,
        language: metadata.language,
        isChorus: metadata.isChorus,
        author: metadata.author,
        composer: metadata.composer,
        tags: metadata.tags,
        syllables: metadata.syllables,
        reference: metadata.reference,
        tune: metadata.tune,
        meter: metadata.meter,
      },
    });

    if (paragraphs && paragraphs.length > 0) {
      await tx.paragraph.deleteMany({
        where: { songId },
      });

      await tx.paragraph.createMany({
        data: paragraphs?.map((p) => ({
          id: p.id,
          order: p.order,
          lines: p.lines,
          type: p.type,
          songId,
        })),
        skipDuplicates: true,
      });
    }
    // 3. Update Song
    return await tx.song.update({
      where: { id: songId },
      data: { title: data.title },
      include: { metadata: true, paragraphs: true, track: true },
    });
  });
}
