import { SongT } from '~/src/types/song';
import { db } from '~/src/libs/db/drizzle';
import * as schema from '~/src/libs/db/drizzle/schema';
import { eq, inArray } from 'drizzle-orm';
import { logger } from '~/src/utils/logger';

export async function updateSong({ id, data: song }: { id: string; data: SongT }) {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(schema.songMetadata)
        .set({
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
        })
        .where(eq(schema.songMetadata.id, song.metadata.id));

      const backendUpdatedAt = new Date(song.updatedAt || new Date());
      const updatedAt = Math.floor(backendUpdatedAt.getTime() / 1000);

      await tx
        .update(schema.songs)
        .set({
          title: song.title,
          metadataId: song.metadata.id,
          trackId: song.track?.id ?? null,
          updatedAt: updatedAt,
        })
        .where(eq(schema.songs.id, id));

      const existingParagraphs = await tx
        .select({ id: schema.paragraphs.id })
        .from(schema.paragraphs)
        .where(eq(schema.paragraphs.songId, id));

      const pids = existingParagraphs.map((p) => p.id);
      if (pids.length) {
        await tx.delete(schema.lines).where(inArray(schema.lines.paragraphId, pids));
      }
      await tx.delete(schema.paragraphs).where(eq(schema.paragraphs.songId, id));

      if (song.paragraphs.length) {
        await tx.insert(schema.paragraphs).values(
          song.paragraphs.map((p) => ({
            id: p.id,
            songId: id,
            order: p.order,
            type: p.type ?? null,
          }))
        );

        const lineValues = song.paragraphs.flatMap((p) =>
          p.lines.map((l) => ({
            id: l.id,
            paragraphId: p.id,
            text: l.text,
            order: l.order,
          }))
        );
        if (lineValues.length) {
          await tx.insert(schema.lines).values(lineValues);
        }
      }

      if (song.track) {
        await tx
          .update(schema.trackMetadata)
          .set({
            supabaseId: song.track.metadata.supabaseId,
            path: song.track.metadata.path,
            fileName: song.track.metadata.fileName,
            fullPath: song.track.metadata.fullPath,
            downloadUrl: song.track.metadata.downloadUrl,
            mimeType: song.track.metadata.mimeType,
            fileSize: song.track.metadata.fileSize,
          })
          .where(eq(schema.trackMetadata.id, song.track.metadata.id));

        await tx
          .update(schema.tracks)
          .set({
            metadataId: song.track.metadata.id,
          })
          .where(eq(schema.tracks.id, song.track.id));
      }
    });
    logger.info('Song updated successfully', { songId: id });
  } catch (error) {
    logger.error('Error updating song', {
      songId: id,
      error,
    });
  }
}
