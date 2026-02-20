import { sourceValidiation } from "../common";
import z from "zod";

export const SongMetadataSchema = z
  .object({
    isChorus: z.boolean().optional(),
    source: z.array(sourceValidiation),
    number: z.coerce
      .number()
      .int("Song number must be an integer")
      .positive("Song number must be positive")
      .max(9999, "Song number too high (max 9999)"),
    oldNumber: z.coerce.number().int("Old number must be an integer").optional().nullable(),
    language: z
      .string()
      .min(1, "Language code is required")
      .max(10, "Language code too long (max 10 chars)"),
    author: z.string().max(200, "Author name too long").optional().nullable(),
    composer: z.string().max(200, "Composer name too long").optional().nullable(),
    tags: z.array(z.string().max(50, "Tag too long")),
    syllables: z.string().max(100, "Syllables too long").optional().nullable(),
    reference: z.string().max(500, "Reference too long").optional().nullable(),
    tune: z.string().max(200, "Tune name too long").optional().nullable(),
    meter: z.string().max(50, "Meter too long").optional().nullable(),
  })
  .strict();

export const ResponseSongMetadataSchema = z.object({
  isChorus: z.boolean().default(false).optional(),
  number: z.coerce
    .number()
    .int("Song number must be an integer")
    .positive("Song number must be positive")
    .max(9999, "Song number too high (max 9999)"),
  oldNumber: z.coerce.number().int("Old number must be an integer").optional().nullable(),
  language: z
    .string()
    .min(1, "Language code is required")
    .max(10, "Language code too long (max 10 chars)"),
  author: z.string().max(200, "Author name too long").optional().nullable(),
});
