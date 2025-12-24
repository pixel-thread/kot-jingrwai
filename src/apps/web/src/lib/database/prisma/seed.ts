// @ts-nocheck
import { PrismaClient } from "./generated/prisma";
import { type SongT } from "@repo/types";
import { songs, khoros } from "@repo/constants";

const allSongs: any[] = [...songs, ...khoros];

const prisma = new PrismaClient();

// simple concurrency limiter
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
) {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current], current);
    }
  }

  const workers = Array.from({ length: limit }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  console.log("Clearing tables");
  await prisma.$transaction([
    prisma.line.deleteMany(),
    prisma.paragraph.deleteMany(),
    prisma.song.deleteMany(),
    prisma.songMetadata.deleteMany(),
  ]);

  console.log("Seeding songs in parallel");

  let totalParagraphs = 0;

  await mapWithConcurrency(allSongs, 8, async (song, i) => {
    await prisma.$transaction(async (tx) => {
      const metadata = song.metadata;

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
        },
      });

      const createdSong = await tx.song.create({
        data: {
          title: song.title,
          metadataId: createdMetadata.id,
        },
      });

      // paragraphs and lines for this song
      for (const paragraph of song.paragraphs) {
        const createdParagraph = await tx.paragraph.create({
          data: {
            songId: createdSong.id,
            order: paragraph.order,
            type: paragraph?.type ?? "VERSE",
          },
        });

        await tx.line.createMany({
          data: paragraph.lines.map((lineText, idx) => ({
            text: lineText,
            order: idx,
            paragraphId: createdParagraph.id,
          })),
        });

        totalParagraphs++;
      }

      // if you still need songId on metadata
      if ("songId" in createdMetadata) {
        await tx.songMetadata.update({
          where: { id: createdMetadata.id },
          data: { songId: createdSong.id },
        });
      }
    });

    if ((i + 1) % 20 === 0) {
      console.log(`Seeded ${i + 1}/${allSongs.length} songs`);
    }
  });

  console.log(
    `✅ Seeded ${allSongs.length} songs, ${totalParagraphs} paragraphs`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
