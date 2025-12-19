import * as schema from '~/src/libs/db/drizzle/schema';
import { JoinedSongRow } from '~/src/types/song';
import { eq } from 'drizzle-orm';
import { songsMapper } from '~/src/utils/mapper/songMapper';
import { db } from '~/src/libs/db/drizzle';
import { logger } from '~/src/utils/logger';

type Props = {
  isChorus?: boolean;
  isAll?: boolean;
  page?: number;
};

export async function getSongs({ isChorus = false }: Props) {
  try {
    console.log('🚀 ~ getSongs ~ isChorus', isChorus);
    const rows: JoinedSongRow[] = await db
      .select({
        lines: schema.lines,
        paragraphs: schema.paragraphs,
        songMetadata: schema.songMetadata,
        songs: schema.songs,
      })
      .from(schema.songs)
      .leftJoin(schema.songMetadata, eq(schema.songs.metadataId, schema.songMetadata.id))
      .leftJoin(schema.paragraphs, eq(schema.paragraphs.songId, schema.songs.id))
      .leftJoin(schema.lines, eq(schema.lines.paragraphId, schema.paragraphs.id))
      .where(eq(schema.songMetadata.isChorus, isChorus));

    if (rows.length > 0) {
      console.log('Returning db songs');
      return songsMapper(rows);
    }
    return [];
  } catch (error) {
    logger.error('🚀 ~ getSongs ~ error', error);
  }
}
