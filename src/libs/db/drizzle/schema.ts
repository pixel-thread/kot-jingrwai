import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

/**
 * Enums as TEXT + CHECK in SQLite
 * (you still get TS enums in your app layer)
 */
export const VerseType = {
  VERSE: 'VERSE',
  CHORUS: 'CHORUS',
  BRIDGE: 'BRIDGE',
  INTRO: 'INTRO',
  OUTRO: 'OUTRO',
} as const;

export const Status = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED',
} as const;

/**
 * Songs & metadata
 */
export const songs = sqliteTable('Song', {
  id: text('id').primaryKey().notNull(),
  title: text('title').notNull(),
  isChorus: integer('isChorus', { mode: 'boolean' }).notNull().default(false),

  createdAt: integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),

  trackId: text('trackId').references(() => tracks.id),

  metadataId: text('metadataId')
    .notNull()
    .unique()
    .references(() => songMetadata.id),
});

export const songMetadata = sqliteTable('SongMetadata', {
  id: text('id').primaryKey().notNull(),
  number: integer('number').notNull(),
  oldNumber: integer('oldNumber'),
  language: text('language').notNull(),
  author: text('author'),
  composer: text('composer'),
  // String[] in Prisma → JSON in SQLite
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  syllables: text('syllables'),
  reference: text('reference'),
  tune: text('tune'),
  meter: text('meter'),

  createdAt: integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),

  songId: text('songId').unique(),
});

const verseTypeValues = Object.values(VerseType) as [string, ...string[]];

export const paragraphs = sqliteTable('Paragraph', {
  id: text('id').primaryKey().notNull(),
  order: integer('order').notNull(),
  // String[] → JSON array
  lines: text('lines', { mode: 'json' }).$type<string[]>(),
  type: text('type', {
    enum: verseTypeValues,
  }),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),

  songId: text('songId')
    .notNull()
    .references(() => songs.id),
});

/**
 * Tracks & metadata
 */
export const tracks = sqliteTable('Track', {
  id: text('id').primaryKey().notNull(),

  createdAt: integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),

  metadataId: text('metadataId')
    .notNull()
    .unique()
    .references(() => trackMetadata.id),
});

export const trackMetadata = sqliteTable('TrackMetadata', {
  id: text('id').primaryKey().notNull(),
  supabaseId: text('supabaseId').notNull(),
  path: text('path').notNull(),
  fileName: text('fileName').notNull(),
  fullPath: text('fullPath').notNull(),
  downloadUrl: text('downloadUrl').notNull(),
  mimeType: text('mimeType').notNull(),
  fileSize: integer('fileSize').notNull(),

  createdAt: integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),

  trackId: text('trackId').unique(),
});
