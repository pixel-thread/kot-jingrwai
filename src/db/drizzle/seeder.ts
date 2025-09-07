import AsyncStorage from '@react-native-async-storage/async-storage';
import { DB_SEED_KEY } from '~/src/libs/constant';
import { db } from '.';
import { songs } from '~/src/libs/songs';
import { khoros } from '~/src/libs/khoros';
import { songTable, songMetadataTable, songParagraphTable } from './schema';
import { logger } from '~/src/utils/logger';

// Helper: check for duplicate IDs in array
function checkForDuplicateIDs(array: any, label: string) {
  const seen = new Set<string>();
  for (const item of array) {
    if (seen.has(item.id)) {
      logger.error(`Duplicate ${label} id found: ${item.id}`);
      throw new Error(`Duplicate ${label} id: ${item.id}`);
    }
    seen.add(item.id);
  }
}

export async function seedSongs() {
  try {
    const isSeeded = await AsyncStorage.getItem(DB_SEED_KEY);
    if (isSeeded === 'true') {
      logger.log('Database already seeded, skipping seeding.');
      return;
    }

    // Check for duplicates before doing anything!
    checkForDuplicateIDs(songs, 'song');
    checkForDuplicateIDs(khoros, 'chorus');

    logger.log('Deleting old data...');
    await db.transaction(async () => {
      await db.delete(songParagraphTable);
      await db.delete(songMetadataTable);
      await db.delete(songTable);
    });
    logger.log('Deleted old data.');

    logger.log('Starting database song seeding...');
    await db.transaction(async () => {
      for (const song of songs.sort((a, b) => a.metadata.number - b.metadata.number)) {
        logger.log(`Inserting song ${song.id}`);
        try {
          await db.insert(songTable).values({
            id: song.id,
            title: song.title,
            isChorus: 0,
          });
          const metadata = song.metadata;
          await db.insert(songMetadataTable).values({
            songId: song.id,
            number: metadata.number,
            oldNumber: metadata.oldNumber ?? null,
            language: metadata.language,
            author: metadata.author ?? null,
            composer: metadata.composer ?? null,
            createdAt: metadata.createdAt ?? null,
            tags: metadata.tags ? JSON.stringify(metadata.tags) : null,
            syllables: metadata.syllables ?? null,
            reference: metadata.reference ?? null,
            tune: metadata.tune ?? null,
            meter: metadata.meter ?? null,
          });

          for (const para of song.paragraphs) {
            await db.insert(songParagraphTable).values({
              id: `${song.id}-${para.id}`,
              songId: song.id,
              order: para.order,
              lines: JSON.stringify(para.lines),
              type: para.type ?? null,
            });
          }
        } catch (err: any) {
          logger.error(`Insert failed for SONG id ${song.id}: ${err.message}`);
          throw err;
        }
      }
    });

    logger.log('Finished database song seeding.');
    logger.log('Starting database khoros seeding...');
    await db.transaction(async () => {
      for (const chorus of khoros) {
        logger.log(`Inserting chorus ${chorus.id}`);
        try {
          await db.insert(songTable).values({
            id: chorus.id,
            title: chorus.title,
            isChorus: 1,
          });
          const metadata = chorus.metadata;
          await db.insert(songMetadataTable).values({
            songId: chorus.id,
            number: metadata.number,
            oldNumber: metadata.oldNumber ?? null,
            language: metadata.language,
            author: metadata.author ?? null,
            composer: metadata.composer ?? null,
            createdAt: metadata.createdAt ?? null,
            tags: metadata.tags ? JSON.stringify(metadata.tags) : null,
            syllables: metadata.syllables ?? null,
            reference: metadata.reference ?? null,
            tune: metadata.tune ?? null,
            meter: metadata.meter ?? null,
          });

          for (const para of chorus.paragraphs) {
            await db.insert(songParagraphTable).values({
              id: `${chorus.id}-${para.id}`,
              songId: chorus.id,
              order: para.order,
              lines: JSON.stringify(para.lines),
              type: para.type ?? null,
            });
          }
        } catch (err: any) {
          logger.error(`Insert failed for CHORUS id ${chorus.id}: ${err.message}`);
          throw err;
        }
      }
    });

    // Only set the seeded flag if everything succeeded
    await AsyncStorage.setItem(DB_SEED_KEY, 'true');
    logger.log('Database seeding completed successfully!');
  } catch (error) {
    logger.error({ name: 'Seeder Error', message: error });
    throw error;
  }
}
