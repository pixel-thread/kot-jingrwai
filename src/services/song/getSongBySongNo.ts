import { db } from '~/src/db/drizzle';
import { songTable, songMetadataTable } from '~/src/db/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function getSongBySongNo(songNo: number) {
  const songs = await db
    .select()
    .from(songTable)
    .innerJoin(songMetadataTable, eq(songMetadataTable.songId, songTable.id))
    .where(eq(songMetadataTable.number, songNo));

  return songs;
}
