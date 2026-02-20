import z from "zod";
import { UUIDSchema } from "../common";

// Track Schema
export const TrackSchema = z
  .object({
    songs: z.array(UUIDSchema).optional(),
  })
  .strict();

export const TrackResponseSchema = z.object({
  path: z.url("Must be a valid URL"),
  downloadUrl: z.url("Must be a valid URL"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const TracksResponseSchema = z.array(TrackResponseSchema);
