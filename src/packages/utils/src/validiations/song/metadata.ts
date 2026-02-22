import { sourceValidiation, textOnlyValidiation } from "../common";
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
    language: textOnlyValidiation
      .min(1, "Language code is required")
      .max(10, "Language code too long (max 10 chars)"),
    author: textOnlyValidiation.max(200, "Author name too long").optional().nullable(),
    composer: textOnlyValidiation.max(200, "Composer name too long").optional().nullable(),
    tags: z.array(textOnlyValidiation.max(50, "Tag too long")),
    syllables: textOnlyValidiation.max(100, "Syllables too long").optional().nullable(),
    reference: textOnlyValidiation.max(500, "Reference too long").optional().nullable(),
    tune: textOnlyValidiation.max(200, "Tune name too long").optional().nullable(),
    meter: textOnlyValidiation.max(50, "Meter too long").optional().nullable(),
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
  language: textOnlyValidiation
    .min(1, "Language code is required")
    .max(10, "Language code too long (max 10 chars)"),
  author: textOnlyValidiation.max(200, "Author name too long").optional().nullable(),
});
