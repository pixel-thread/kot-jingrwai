import { SongT, JoinedSongRow, SongMetadata, SongParagraph, Line } from '~/src/types/song';

export function songMapper(rows: JoinedSongRow[]): SongT {
  if (rows.length === 0) return {} as SongT;

  const first = rows[0]!;

  // Group paragraphs and lines
  const paragraphsMap = new Map<string, SongParagraph>();

  for (const row of rows) {
    if (row.paragraphs) {
      const pid = row.paragraphs.id;
      if (!paragraphsMap.has(pid)) {
        paragraphsMap.set(pid, {
          id: row.paragraphs.id,
          order: row.paragraphs.order,
          lines: [],
          type: row.paragraphs.type ?? undefined, // Handle null type
          songId: row.paragraphs.songId,
        });
      }

      // Safe line push - only if lines exist and paragraphId matches
      if (row.lines && row.lines.paragraphId === pid) {
        paragraphsMap.get(pid)!.lines.push({
          id: row.lines.id,
          order: row.lines.order,
          text: row.lines.text,
          paragraphId: row.lines.paragraphId!,
        });
      }
    }
  }

  const metadata: SongMetadata = {
    id: first.songMetadata!.id,
    number: first.songMetadata!.number,
    oldNumber: first.songMetadata!.oldNumber ?? null,
    language: first.songMetadata!.language,
    author: first.songMetadata!.author ?? null,
    composer: first.songMetadata!.composer ?? null,
    isChorus: first.songMetadata!.isChorus ?? false,
    tags: first.songMetadata!.tags ? JSON.parse(first.songMetadata!.tags) : [],
    syllables: first.songMetadata!.syllables ?? null,
    reference: first.songMetadata!.reference ?? null,
    tune: first.songMetadata!.tune ?? null,
    meter: first.songMetadata!.meter ?? null,
  };

  return {
    id: first.songs.id,
    title: first.songs.title,
    metadata,
    paragraphs: Array.from(paragraphsMap.values()).sort((a, b) => a.order - b.order),
    metadataId: first.songs.metadataId,
    trackId: first.songs.trackId,
    track: null,
    createdAt: undefined,
    updatedAt: undefined,
  };
}

export function songsMapper(rows: JoinedSongRow[]): SongT[] {
  const songsMap = new Map<string, JoinedSongRow[]>();

  // Group rows by song ID
  for (const row of rows) {
    const songId = row.songs.id;
    if (!songsMap.has(songId)) {
      songsMap.set(songId, []);
    }
    songsMap.get(songId)!.push(row);
  }

  // Map each song group
  return Array.from(songsMap.entries())
    .map(([_, songRows]) => songMapper(songRows))
    .sort((a, b) => a.metadata.number - b.metadata.number); // Sort by song number
}
