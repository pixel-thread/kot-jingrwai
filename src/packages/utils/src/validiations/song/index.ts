import z from "zod";

const verseTypes = ["VERSE", "CHORUS", "BRIDGE", "INTRO", "OUTRO"];

export const source = ["KOT_JINGRWAI", "LYNTI_BNENG"];

const VerseTypeSchema = z
  .enum(verseTypes)
  .optional()
  .refine((val) => !val || Object.values(verseTypes).includes(val), {
    message: "Invalid verse type. Must be INTRO, CHORUS, VERSE, BRIDGE, or OUTRO",
  })
  .default("VERSE");

const sourceSchema = z
  .enum(source)
  .refine((val) => !val || Object.values(source).includes(val), {
    message: "Source must be one of the app",
  })
  .default("KOT_JINGRWAI");

// UUID Schema
const UUIDSchema = z.uuid("Must be a valid UUID format");

export const PrayerSchema = z.object({
  id: UUIDSchema.optional(),
  value: z.string().min(1, "Prayer is required").max(500, "Prayer too long (max 500 chars)"),
  songId: UUIDSchema.optional(),
  order: z.number(),
  isPaidbah: z.boolean(),
});

// TrackMetadata Schema
export const TrackMetadataSchema = z
  .object({
    id: UUIDSchema.optional(),
    supabaseId: z
      .string()
      .min(1, "Supabase ID is required")
      .max(100, "Supabase ID too long (max 100 chars)"),
    path: z.string().min(1, "Path is required"),
    fileName: z
      .string()
      .min(1, "File name is required")
      .max(255, "File name too long (max 255 chars)"),
    fullPath: z.string().min(1, "Full path is required"),
    downloadUrl: z.url("Must be a valid URL"),
    mimeType: z.string().min(1, "MIME type is required").max(100, "MIME type too long"),
    fileSize: z
      .number()
      .int("File size must be an integer")
      .positive("File size must be positive")
      .max(10_000_000_000, "File size too large (max 10GB)"),
    trackId: UUIDSchema.optional(),
  })
  .strict();

// Track Schema
export const TrackSchema = z
  .object({
    id: UUIDSchema.optional(),
    metadataId: UUIDSchema.refine((id) => id && id !== "", "Valid metadata ID is required"),
    songs: z.array(z.uuid("Invalid song UUID")).optional(),
  })
  .strict();

// SongMetadata Schema
export const SongMetadataSchema = z
  .object({
    id: UUIDSchema.optional(),
    isChorus: z.boolean().optional(),
    source: sourceSchema,
    number: z
      .number()
      .int("Song number must be an integer")
      .positive("Song number must be positive")
      .max(9999, "Song number too high (max 9999)"),
    oldNumber: z.number().int("Old number must be an integer").optional().nullable(),
    language: z
      .string()
      .min(1, "Language code is required")
      .max(10, "Language code too long (max 10 chars)"),
    author: z.string().max(200, "Author name too long").optional(),
    composer: z.string().max(200, "Composer name too long").optional(),
    tags: z.array(z.string().max(50, "Tag too long")),
    syllables: z.string().max(100, "Syllables too long").optional().nullable(),
    reference: z.string().max(500, "Reference too long").optional().nullable(),
    tune: z.string().max(200, "Tune name too long").optional().nullable(),
    meter: z.string().max(50, "Meter too long").optional().nullable(),
    songId: UUIDSchema.optional().nullable(),
  })
  .strict();

// Paragraph Schema
export const ParagraphSchema = z
  .object({
    id: UUIDSchema.optional(),
    order: z
      .number()
      .int("Order must be an integer")
      .positive("Order must be positive")
      .max(999, "Order too high (max 999)"),
    lines: z
      .array(z.string().min(1, "Line cannot be empty").max(1000, "Line too long"))
      .min(1, "At least one line required"),
    type: VerseTypeSchema,
    songId: UUIDSchema.refine((id) => id && id !== "", "Valid song ID is required").optional(),
  })
  .strict();

// Song Schema (Create)
export const SongSchema = z
  .object({
    id: UUIDSchema.optional(),
    title: z.string().min(1, "Song title is required").max(500, "Title too long (max 500 chars)"),
    trackId: z.uuid("Invalid track UUID").or(z.literal("")).optional().nullable(),
    metadataId: UUIDSchema.optional(),
    metadata: SongMetadataSchema,
    track: TrackSchema.optional().nullable(),
    paragraphs: z.array(ParagraphSchema).optional().nullable(),
    prayers: z.array(PrayerSchema).optional().nullable(),
  })
  .strict();
