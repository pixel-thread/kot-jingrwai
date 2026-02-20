import { getSongs } from "@/services/songs/getSongs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { getMeta } from "@/utils/pagination/getMeta";
import { SongsResponseSchema, sourceValidiation } from "@repo/utils";
import z from "zod";

const querySchema = z.object({
  query: z.string().optional().default(""),
  page: z.string().optional().default("1"),
  isChorus: z.coerce
    .boolean()
    .transform((val) => Boolean(val))
    .default(false),
  source: sourceValidiation,
});

export const GET = withValidation({ query: querySchema }, async ({ query }) => {
  try {
    const page = query.page;
    const queryValue = query.query;
    const isChorus = query.isChorus;

    const queryNumber = Number(queryValue);
    const isNumber = !Number.isNaN(queryNumber);

    const [songs, total] = await getSongs({
      page,
      where: {
        metadata: { isChorus },
        OR: [
          ...(isNumber
            ? [
                {
                  metadata: {
                    number: { equals: queryNumber },
                  },
                },
              ]
            : []),
          {
            title: {
              contains: queryValue,
              mode: "insensitive",
            },
          },
          {
            paragraphs: {
              some: {
                lines: {
                  some: {
                    order: 0,
                    text: {
                      contains: queryValue,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });

    return SuccessResponse({
      data: sanitize(SongsResponseSchema, songs),
      meta: getMeta({ currentPage: page || "1", total }),
      message: "Success fetching songs",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
