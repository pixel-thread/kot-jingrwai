import { AppSource } from "@/lib/database/prisma/generated/prisma";
import { SongService } from "@/services/songs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { requiredRole } from "@/utils/middleware/requireRole";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import {
  SongResponseSchema,
  SongSchema,
  SongsResponseSchema,
  sourceValidiation,
} from "@repo/utils";
import z from "zod";

const routeSchema = {
  query: z.object({
    page: z.coerce.string().default("1"),
    isChorus: z.coerce
      .boolean()
      .default(false)
      .transform((val) => Boolean(val))
      .optional(),
    source: sourceValidiation,
  }),
};

export const GET = withValidation(routeSchema, async ({ query }, req) => {
  try {
    await requiredRole(req, "SUPER_ADMIN");
    const { isChorus, source } = query;

    const songs = await SongService.findAllSongs({
      where: { metadata: { isChorus: isChorus, source: { has: source as AppSource } } },
    });

    return SuccessResponse({
      data: sanitize(SongsResponseSchema, songs),
      message: "Successfully fetched songs",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});

export const POST = withValidation({ body: SongSchema }, async ({ body }, req) => {
  try {
    await requiredRole(req, "ADMIN");

    const result = await SongService.create({ data: body });

    return SuccessResponse({
      data: sanitize(SongResponseSchema, result),
      message: "Successfully created song with prayers and metadata",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
