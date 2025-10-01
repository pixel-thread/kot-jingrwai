import AsyncStorage from '@react-native-async-storage/async-storage';
import { DB_SEED_KEY } from '~/src/libs/constant';
import { db } from '.';
import { songs } from '~/src/libs/songs';
import { songTable, songMetadataTable, songParagraphTable } from './schema';
import { logger } from '~/src/utils/logger';

export async function seedSongs() {
  try {
    const isSeeded = await AsyncStorage.getItem(DB_SEED_KEY);
    // Fix seed flag check
    if (isSeeded === 'true') {
      logger.log('Database already seeded, skipping seeding.');
      return;
    }

    logger.log('Deleting old data...');

    db.transaction(async () => {
      await db.delete(songParagraphTable);
      await db.delete(songMetadataTable);
      await db.delete(songTable);
    });

    logger.log('Deleted old data.');

    logger.log('Starting database seeding...');

    // Wrap all inserts in a transaction for atomicity and performance
    await db.transaction(async () => {
      for (const song of songs) {
        logger.log(`Inserting song ${song.id}`);

        await db.insert(songTable).values({
          id: song.id,
          title: song.title,
        });

        const metadata = song.metadata;
        logger.log(`Inserting metadata for song ${song.id}`);
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
        logger.log(`Inserted metadata for song ${song.id}`);

        for (const para of song.paragraphs) {
          logger.log(`Inserting paragraphs for song ${song.id}__${para.id}`);
          await db.insert(songParagraphTable).values({
            id: `${song.id}-${para.id}`,
            songId: song.id,
            order: para.order,
            lines: JSON.stringify(para.lines),
            type: para.type ?? null,
          });
          logger.log(`Inserted paragraphs for song ${song.id}__${para.id}`);
        }
        logger.log(`Inserted paragraphs for song ${song.id}`);
      }
    });

    // Set seeded flag after full seeding completes successfully
    await AsyncStorage.setItem(DB_SEED_KEY, 'true');
    logger.log('Database seeding completed successfully!');
  } catch (error) {
    logger.error({ name: 'Seeder Error', message: error });
  }
}
