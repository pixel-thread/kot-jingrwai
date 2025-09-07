import { eq } from 'drizzle-orm';
import { db } from '~/src/db/drizzle';
import { songMetadataTable, songParagraphTable, songTable } from '~/src/db/drizzle/schema';
import { SongParagraphType, SongT } from '~/src/types/song';

export async function getSongs(isChorusFilter = 0): Promise<SongT[]> {
  const songsRows = await db
    .select({
      id: songTable.id,
      title: songTable.title,
      isChorus: songTable.isChorus,
      metadata_number: songMetadataTable.number,
      metadata_language: songMetadataTable.language,
      metadata_author: songMetadataTable.author,
      metadata_composer: songMetadataTable.composer,
      metadata_createdAt: songMetadataTable.createdAt,
      metadata_tags: songMetadataTable.tags,
      metadata_oldNumber: songMetadataTable.oldNumber,
      metadata_syllables: songMetadataTable.syllables,
      metadata_reference: songMetadataTable.reference,
      metadata_tune: songMetadataTable.tune,
      metadata_meter: songMetadataTable.meter,
    })
    .from(songTable)
    .innerJoin(songMetadataTable, eq(songMetadataTable.songId, songTable.id))
    .orderBy(songMetadataTable.number)
    .where(eq(songTable.isChorus, isChorusFilter));
  const fullSongs: SongT[] = [];

  for (const row of songsRows) {
    const paragraphsRows = await db
      .select({
        id: songParagraphTable.id,
        songId: songParagraphTable.songId,
        order: songParagraphTable.order,
        lines: songParagraphTable.lines,
        type: songParagraphTable.type,
      })
      .from(songParagraphTable)
      .where(eq(songParagraphTable.songId, row.id))
      .orderBy(songParagraphTable.order);

    fullSongs.push({
      id: row.id,
      title: row.title,
      isChorus: row.isChorus ?? 0,
      metadata: {
        number: row.metadata_number,
        oldNumber: row.metadata_oldNumber || undefined,
        language: row.metadata_language,
        author: row.metadata_author || undefined,
        composer: row.metadata_composer || undefined,
        createdAt: row.metadata_createdAt || undefined,
        tags: row.metadata_tags ? JSON.parse(row.metadata_tags) : undefined,
        syllables: row.metadata_syllables || undefined,
        reference: row.metadata_reference || undefined,
        tune: row.metadata_tune || undefined,
        meter: row.metadata_meter || undefined,
        songId: row.id,
      },
      paragraphs: paragraphsRows.map((p) => ({
        id: p.id,
        order: p.order,
        lines: JSON.parse(p.lines),
        type: (p.type as SongParagraphType) || undefined,
        songId: p.songId,
      })),
    });
  }

  return fullSongs;
}
