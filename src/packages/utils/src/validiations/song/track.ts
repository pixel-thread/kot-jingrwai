import z from "zod";
import { dateValidiation, UUIDSchema } from "../common";

export const TrackMetadataSchema = z
  .object({
    path: z.string().min(1, "Path is required"),
    fileName: z
      .string()
      .min(1, "File name is required")
      .max(255, "File name too long (max 255 chars)"),
    fullPath: z.string().min(1, "Full path is required"),
    downloadUrl: z.url("Must be a valid URL"),
    mimeType: z.string().min(1, "MIME type is required").max(100, "MIME type too long"),
    fileSize: z.coerce
      .number()
      .int("File size must be an integer")
      .positive("File size must be positive")
      .max(10_000_000_000, "File size too large (max 10GB)"),
  })
  .strict();

// Track Schema
export const TrackSchema = z
  .object({
    songs: z.array(UUIDSchema).optional(),
  })
  .strict();

export const ResponseTrackSchema = z
  .object({
    id: UUIDSchema,
    songs: z.array(z.uuid("Invalid song UUID")).optional(),
    updatedAt: dateValidiation.optional(),
    createdAt: dateValidiation.optional(),
  })
  .strict();
