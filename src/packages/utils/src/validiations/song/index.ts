import z from "zod";
import { dateValidiation, UUIDSchema } from "../common";
import { ResponseSongMetadataSchema, SongMetadataSchema } from "./metadata";
import { TrackSchema } from "./track";
import { ParagraphSchema, ResponseParagraphSchema } from "./paragraph";
import { PrayerSchema, ResponsePrayerSchema } from "./prayer";

// Song Schema (Create)
export const SongSchema = z
  .object({
    title: z.string().min(1, "Song title is required").max(500, "Title too long (max 500 chars)"),
    metadata: SongMetadataSchema,
    track: TrackSchema.optional().nullable(),
    paragraphs: z.array(ParagraphSchema).optional(),
    prayers: z.array(PrayerSchema).optional(),
  })
  .strict();

export const SongResponseSchema = z.object({
  id: UUIDSchema,
  title: z.string().min(1, "Song title is required").max(500, "Title too long (max 500 chars)"),
  metadata: ResponseSongMetadataSchema,
  track: TrackSchema.optional().nullable(),
  paragraphs: z.array(ResponseParagraphSchema).optional().nullable(),
  prayers: z.array(ResponsePrayerSchema).optional().nullable(),
  updatedAt: dateValidiation.optional(),
  createdAt: dateValidiation.optional(),
});

export const SongsResponseSchema = z.array(
  SongResponseSchema.omit({
    track: true,
    paragraphs: true,
    prayers: true,
  })
);
