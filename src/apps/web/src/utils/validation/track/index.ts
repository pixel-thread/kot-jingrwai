import z from "zod";

export const TrackResponseSchema = z.object({
  path: z.url("Must be a valid URL"),
  trackId: z.uuid(),
  downloadUrl: z.url("Must be a valid URL"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
