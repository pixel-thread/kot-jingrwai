import 'dotenv/config';
import Database from 'better-sqlite3';
import * as schema from '../src/libs/db/drizzle/schema';
import type { SongT } from '../src/types/song';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import { sql } from 'drizzle-orm';

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_URL = `${apiBaseUrl}/songs`;
const OUTPUT_PATH = path.resolve('assets/db/kot-jingrwai.db');

const sqlite = new Database(OUTPUT_PATH);
const db = drizzle(sqlite, { schema });

sqlite.pragma('journal_mode = MEMORY');
sqlite.pragma('synchronous = OFF');
sqlite.pragma('cache_size = 10000000');

/**
 * Helper function to split arrays into chunks
 * Prevents SQLite "too many SQL variables" error (32,767 limit)
 */
function* chunkArray<T>(array: T[], size: number): Generator<T[]> {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

async function seedLocalDb(): Promise<void> {
  console.log('🔨 Migrating schema...');
  await migrate(db, { migrationsFolder: 'src/libs/db/drizzle/migrations' });

  console.log('🌱 Fetching songs from backend...');
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const json: { success: boolean; data: SongT[] } = await response.json();
  if (!json.success || !json.data) throw new Error('Invalid response');

  console.log(`📥 Preparing ${json.data.length} songs...`);

  // BUILD BATCHES OUTSIDE LOOPS
  const metadataBatch: any[] = [];
  const trackMetadataBatch: any[] = [];
  const tracksBatch: any[] = [];
  const songsBatch: any[] = [];
  const paragraphsBatch: any[] = [];
  const linesBatch: any[] = [];

  // Process all songs and build batches
  for (const song of json.data) {
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

  // Execute all inserts inside a single transaction
  const transaction = sqlite.transaction(() => {
    console.log(`\n📝 Inserting batches:`);
    console.log(`  - Metadata: ${metadataBatch.length}`);
    console.log(`  - Track Metadata: ${trackMetadataBatch.length}`);
    console.log(`  - Tracks: ${tracksBatch.length}`);
    console.log(`  - Songs: ${songsBatch.length}`);
    console.log(`  - Paragraphs: ${paragraphsBatch.length}`);
    console.log(`  - Lines: ${linesBatch.length}\n`);

    // Insert metadata
    if (metadataBatch.length) {
      db.insert(schema.songMetadata).values(metadataBatch).onConflictDoNothing().run();
      console.log('✅ Metadata inserted');
    }

    // Insert track metadata
    if (trackMetadataBatch.length) {
      db.insert(schema.trackMetadata).values(trackMetadataBatch).onConflictDoNothing().run();
      console.log('✅ Track metadata inserted');
    }

    // Insert tracks
    if (tracksBatch.length) {
      db.insert(schema.tracks).values(tracksBatch).onConflictDoNothing().run();
      console.log('✅ Tracks inserted');
    }

    // Insert songs
    if (songsBatch.length) {
      db.insert(schema.songs).values(songsBatch).onConflictDoNothing().run();
      console.log('✅ Songs inserted');
    }

    // Insert paragraphs in chunks (1000 per query = 4,000 params)
    if (paragraphsBatch.length) {
      let paragraphCount = 0;
      for (const chunk of chunkArray(paragraphsBatch, 1000)) {
        db.insert(schema.paragraphs).values(chunk).onConflictDoNothing().run();
        paragraphCount += chunk.length;
      }
      console.log(`✅ Paragraphs inserted (${paragraphCount} total)`);
    }

    // Insert lines in chunks (2000 per query = 10,000 params, under 32,767 limit)
    if (linesBatch.length) {
      let lineCount = 0;
      for (const chunk of chunkArray(linesBatch, 2000)) {
        db.insert(schema.lines).values(chunk).onConflictDoNothing().run();
        lineCount += chunk.length;
      }
      console.log(`✅ Lines inserted (${lineCount} total)`);
    }
  });

  transaction(); // Execute the entire transaction once

  // Verify counts
  console.log('\n🧪 DEBUG COUNTS:');
  const [metaCount, songCount, paraCount, lineCount] = await Promise.all([
    db.select({ count: sql`count(*)` }).from(schema.songMetadata),
    db.select({ count: sql`count(*)` }).from(schema.songs),
    db.select({ count: sql`count(*)` }).from(schema.paragraphs),
    db.select({ count: sql`count(*)` }).from(schema.lines),
  ]);

  console.log(`Metadata: ${metaCount[0].count}`);
  console.log(`Songs: ${songCount[0].count}`);
  console.log(`Paragraphs: ${paraCount[0].count}`);
  console.log(`Lines: ${lineCount[0].count}`);
  console.log(`\n✅ Seeded successfully!`);

  // Reset pragmas to normal for production
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('synchronous = NORMAL');
}

(async () => {
  try {
    await seedLocalDb();
    sqlite.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    sqlite.close();
    process.exit(1);
  }
})();
