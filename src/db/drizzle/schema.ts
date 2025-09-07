// src/db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// SongParagraph table
export const songParagraphTable = sqliteTable('songParagraphs', {
  id: text('id').primaryKey().unique(),
  songId: text('song_id').notNull(),
  order: integer('order').notNull(),
  lines: text('lines').notNull(), // stored as JSON.stringify(lines)
  type: text('type'),
});

// SongMetadata table
export const songMetadataTable = sqliteTable('songMetadata', {
  songId: text('song_id').primaryKey().notNull(),
  number: integer('number').notNull().unique(),
  oldNumber: integer('old_number'),
  language: text('language').notNull(),
  author: text('author'),
  composer: text('composer'),
  createdAt: text('created_at'), // ISO date as string
  tags: text('tags'), // JSON string array
  syllables: text('syllables'),
  reference: text('reference'),
  tune: text('tune'),
  meter: text('meter'),
});

// Song table (base song info)
export const songTable = sqliteTable('songs', {
  id: text('id').primaryKey().unique(),
  title: text('title').notNull(),
  isChorus: integer('is_chorus').notNull().default(0),
});
