import { eq } from 'drizzle-orm';
import { db } from '~/src/libs/db/drizzle';
import * as schema from '~/src/libs/db/drizzle/schema';
import { JoinedSongRow } from '~/src/types/song';
import { songMapper } from '~/src/utils/mapper/songMapper';

export async function getUniqueSongs({ id }: { id: string }) {
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
    .where(eq(schema.songs.id, id));
  return songMapper(rows);
}
