import { pageValidation, UUIDSchema } from "@repo/utils";
import z from "zod";

export const TrackRouteValidation = {
  params: z.object({ id: UUIDSchema }),
};

export const TracksRouteValidation = {
  query: z.object({ page: pageValidation }),
};
