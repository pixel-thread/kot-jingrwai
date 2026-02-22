import { prisma } from "@/lib/database/prisma";
import { SongSchema } from "@repo/utils";
import z from "zod";

type Props = { body: z.infer<typeof SongSchema> };

export async function createSong({ body }: Props) {
  return await prisma.$transaction(async (tx) => {
    const metadata = body.metadata;

    // 1. Create Metadata (including the source array)
    const createdMetadata = await tx.songMetadata.create({
      data: {
        number: metadata.number,
        oldNumber: metadata.oldNumber,
        language: metadata.language,
        author: metadata.author,
        isChorus: !!metadata.isChorus,
        composer: metadata.composer,
        tags: metadata.tags,
        syllables: metadata.syllables,
        reference: metadata.reference,
        tune: metadata.tune,
        meter: metadata.meter,
        source: [metadata.source] as any,
      },
    });

    // 2. Create the Song
    const createdSong = await tx.song.create({
      data: {
        title: body.title,
        metadataId: createdMetadata.id,
      },
    });

    // 3. Handle Paragraphs and Lines
    for (const paragraph of body.paragraphs ?? []) {
      const createdParagraph = await tx.paragraph.create({
        data: {
          songId: createdSong.id,
          order: paragraph.order,
          type: paragraph?.type as any,
        },
      });

      await tx.line.createMany({
        data: paragraph.lines.map((lineText) => ({
          text: lineText.text,
          order: lineText.order,
          paragraphId: createdParagraph.id,
        })),
      });
    }

    // 4. Handle Prayers (if they exist in the body)
    if (body.prayers && body.prayers.length > 0) {
      for (const prayer of body.prayers) {
        const createdPrayer = await tx.songPrayer.create({
          data: {
            songId: createdSong.id,
          },
        });

        // Create lines associated with the prayer
        await tx.line.createMany({
          data: prayer.lines.map((lineText) => ({
            text: lineText.text,
            order: lineText.order,
            prayerId: createdPrayer.id,
            isPaidBah: lineText.isPaidBah,
          })),
        });
      }
    }

    // 5. Connect songId back to metadata
    await tx.songMetadata.update({
      where: { id: createdMetadata.id },
      data: { songId: createdSong.id },
    });

    return createdSong;
  });
}
