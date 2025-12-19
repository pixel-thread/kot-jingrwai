import { db } from '~/src/libs/db/drizzle';
import * as schema from '~/src/libs/db/drizzle/schema';
import { SongT } from '~/src/types/song';

type Props = {
  songs: SongT[];
};

const METADATA_CHUNK_SIZE = 500;
const SONGS_CHUNK_SIZE = 500;

function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export async function addSongs({ songs }: Props): Promise<void> {
  try {
    if (!songs.length) return;

    const metadataBatch: any[] = [];
    const trackMetadataBatch: any[] = [];
    const tracksBatch: any[] = [];
    const songsBatch: any[] = [];
    const paragraphsBatch: any[] = [];
    const linesBatch: any[] = [];

    for (const song of songs) {
      metadataBatch.push({
        id: song.metadata.id,
        number: song.metadata.number,
        oldNumber: song.metadata.oldNumber ?? null,
        language: song.metadata.language,
        author: song.metadata.author ?? null,
        composer: song.metadata.composer ?? null,
        isChorus: song.metadata.isChorus ?? false,
        tags: song.metadata.tags ? JSON.stringify(song.metadata.tags) : null,
        syllables: song.metadata.syllables ?? null,
        reference: song.metadata.reference ?? null,
        tune: song.metadata.tune ?? null,
        meter: song.metadata.meter ?? null,
      });

      if (song.track) {
        trackMetadataBatch.push({
          id: song.track.metadata.id,
          supabaseId: song.track.metadata.supabaseId,
          path: song.track.metadata.path,
          fileName: song.track.metadata.fileName,
          fullPath: song.track.metadata.fullPath,
          downloadUrl: song.track.metadata.downloadUrl,
          mimeType: song.track.metadata.mimeType,
          fileSize: song.track.metadata.fileSize,
        });

        tracksBatch.push({ id: song.track.id, metadataId: song.track.metadata.id });
      }

      songsBatch.push({
        id: song.id,
        title: song.title,
        metadataId: song.metadata.id,
        trackId: song.track?.id ?? null,
      });

      // Process paragraphs and lines for this song
      for (const paragraph of song.paragraphs) {
        paragraphsBatch.push({
          id: paragraph.id,
          songId: song.id,
          order: paragraph.order,
          type: paragraph.type ?? null,
        });

        for (const line of paragraph.lines) {
          linesBatch.push({
            id: line.id,
            paragraphId: paragraph.id,
            text: line.text,
            order: line.order,
          });
        }
      }
    }

    await db.transaction(async (tx) => {
      for (const batch of chunk(metadataBatch, METADATA_CHUNK_SIZE)) {
        await tx.insert(schema.songMetadata).values(batch).onConflictDoNothing();
      }

      for (const batch of chunk(songsBatch, SONGS_CHUNK_SIZE)) {
        await tx.insert(schema.songs).values(batch).onConflictDoNothing();
      }

      for (const batch of chunk(paragraphsBatch, SONGS_CHUNK_SIZE)) {
        await tx.insert(schema.paragraphs).values(batch).onConflictDoNothing();
      }
      for (const batch of chunk(linesBatch, SONGS_CHUNK_SIZE)) {
        await tx.insert(schema.lines).values(batch).onConflictDoNothing();
      }

      for (const batch of chunk(trackMetadataBatch, SONGS_CHUNK_SIZE)) {
        await tx.insert(schema.trackMetadata).values(batch).onConflictDoNothing();
      }

      for (const batch of chunk(tracksBatch, SONGS_CHUNK_SIZE)) {
        await tx.insert(schema.tracks).values(batch).onConflictDoNothing();
      }
    });
  } catch (error) {
    console.log('🚀 ~ addSongs ~ error', error);
  }
}
