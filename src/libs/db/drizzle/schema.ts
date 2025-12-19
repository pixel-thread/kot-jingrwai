import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const VerseType = ['VERSE', 'CHORUS', 'BRIDGE', 'INTRO', 'OUTRO'] as const;

/**
 * --------------------------
 * SONGS
 * --------------------------
 */

export const songMetadata = sqliteTable('song_metadata', {
  id: text('id').primaryKey(),
  number: integer('number').notNull(),
  oldNumber: integer('old_number'),
  language: text('language').notNull(),
  author: text('author'),
  composer: text('composer'),
  isChorus: integer('is_chorus', { mode: 'boolean' }).default(false),
  tags: text('tags'), // JSON string
  syllables: text('syllables'),
  reference: text('reference'),
  tune: text('tune'),
  meter: text('meter'),

  updatedAt: integer('updated_at')
    .notNull()
    .default(sql`(unixepoch())`),
});

export const songs = sqliteTable('songs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  trackId: text('track_id'),
  metadataId: text('metadata_id').notNull().unique(),
  sync: integer('sync', { mode: 'boolean' }).default(false),
  updatedAt: integer('updated_at')
    .notNull()
    .default(sql`(unixepoch())`),
});

/**
 * --------------------------
 * PARAGRAPHS & LINES
 * --------------------------
 */

export const paragraphs = sqliteTable('paragraphs', {
  id: text('id').primaryKey(),
  songId: text('song_id').notNull(),
  order: integer('order').notNull(),
  type: text('type').$type<(typeof VerseType)[number]>(),

  updatedAt: integer('updated_at')
    .notNull()
    .default(sql`(unixepoch())`),
});

export const lines = sqliteTable('lines', {
  id: text('id').primaryKey(),
  paragraphId: text('paragraph_id'),
  text: text('text').notNull(),
  order: integer('order').notNull(),

  updatedAt: integer('updated_at')
    .notNull()
    .default(sql`(unixepoch())`),
});

/**
 * --------------------------
 * TRACKS
 * --------------------------
 */

export const trackMetadata = sqliteTable('track_metadata', {
  id: text('id').primaryKey(),
  supabaseId: text('supabase_id').notNull(),
  path: text('path').notNull(),
  fileName: text('file_name').notNull(),
  fullPath: text('full_path').notNull(),
  downloadUrl: text('download_url').notNull(),
  mimeType: text('mime_type').notNull(),
  fileSize: integer('file_size').notNull(),

  updatedAt: integer('updated_at')
    .notNull()
    .default(sql`(unixepoch())`),
});

export const tracks = sqliteTable('tracks', {
  id: text('id').primaryKey(),
  metadataId: text('metadata_id').notNull().unique(),

  updatedAt: integer('updated_at')
    .notNull()
    .default(sql`(unixepoch())`),
});
