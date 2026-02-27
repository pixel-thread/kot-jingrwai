import { AppSource } from "@/lib/database/prisma/generated/prisma";
import { getSongs } from "@/services/songs/getSongs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { getMeta } from "@/utils/pagination/getMeta";
import { pageValidation, sourceValidiation } from "@repo/utils";
import { SongsResponseSchema } from "@repo/utils";

import z from "zod";

const routeSchema = {
  query: z.object({
    page: pageValidation,
    isChorus: z.coerce
      .boolean()
      .default(false)
      .transform((val) => Boolean(val))
      .optional(),
    source: sourceValidiation,
  }),
};

export const GET = withValidation(routeSchema, async ({ query }) => {
  const { page, isChorus, source } = query;

  const [songs, total] = await getSongs({
    page,
    where: { metadata: { isChorus: isChorus, source: { has: source as AppSource } } },
  });

  return SuccessResponse({
    data: sanitize(SongsResponseSchema, songs),
    meta: getMeta({ currentPage: page, total }),
    message: "Success fetching songs",
  });
});
