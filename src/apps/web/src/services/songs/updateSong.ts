import { prisma } from "@/lib/database/prisma";
import { VerseType } from "@/lib/database/prisma/generated/prisma";
import { AppSourceT } from "@repo/types";
import { SongSchema } from "@repo/utils";
import z from "zod";

type Props = {
  songId: string;
  data: z.infer<typeof SongSchema>;
};

export async function updateSong({ data, songId }: Props) {
  return await prisma.$transaction(async (tx) => {
    const { paragraphs, metadata, prayers, title } = data;

    // 1. Fetch current song to get the metadata ID
    const song = await tx.song.findUnique({
      where: { id: songId },
      select: { metadataId: true },
    });

    if (!song) throw new Error("Song not found");

    // 2. Update Metadata
    await tx.songMetadata.update({
      where: { id: song.metadataId },
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
        source: metadata.source as AppSourceT[],
        updatedAt: new Date(),
      },
    });
    // 3. CLEANUP: Delete existing nested relations
    // Delete Lines first because they depend on Paragraphs/Prayers
    await tx.line.deleteMany({
      where: {
        OR: [{ paragraph: { songId: songId } }, { prayer: { songId: songId } }],
      },
    });

    // Delete Paragraphs and Prayers
    await tx.paragraph.deleteMany({ where: { songId } });
    await tx.songPrayer.deleteMany({ where: { songId } });

    // 4. RECREATE: Paragraphs and their Lines
    if (paragraphs && paragraphs.length > 0) {
      for (const p of paragraphs) {
        await tx.paragraph.create({
          data: {
            order: p.order,
            type: p.type as VerseType,
            songId: songId,
            lines: {
              create: p.lines?.map((l) => ({
                text: l.text,
                order: l.order,
                isPaidBah: l.isPaidBah,
              })),
            },
          },
        });
      }
    }

    // 5. RECREATE: Prayers and their Lines
    if (prayers && prayers.length > 0) {
      for (const prayer of prayers) {
        await tx.songPrayer.create({
          data: {
            songId: songId,
            lines: {
              create: prayer.lines?.map((l) => ({
                text: l.text,
                order: l.order,
                isPaidBah: l.isPaidBah,
              })),
            },
          },
        });
      }
    }

    // 6. Update main Song record and return
    return await tx.song.update({
      where: { id: songId },
      data: { title },
      include: {
        metadata: true,
        paragraphs: { include: { lines: true } },
        prayers: { include: { lines: true } },
        track: true,
      },
    });
  });
}
