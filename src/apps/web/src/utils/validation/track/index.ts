import z from "zod";

export const TrackResponseSchema = z.object({
  path: z.url("Must be a valid URL"),
  downloadUrl: z.url("Must be a valid URL"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export const TracksResponseSchema = z.array(TrackResponseSchema);
