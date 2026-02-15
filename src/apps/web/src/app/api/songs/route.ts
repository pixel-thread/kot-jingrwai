import { $Enums } from "@/lib/database/prisma/generated/prisma";
import { getSongs } from "@/services/songs/getSongs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { getMeta } from "@/utils/pagination/getMeta";
import z from "zod";

const routeSchema = {
  query: z.object({
    page: z.coerce.string().default("1"),
    isChorus: z.coerce.boolean().default(false).optional(),
    source: z
      .enum([$Enums.AppSource.LYNTI_BNENG, $Enums.AppSource.KOT_JINGRWAI])
      .default($Enums.AppSource.KOT_JINGRWAI)
      .optional(),
  }),
};

export const GET = withValidation(routeSchema, async ({ query }) => {
  try {
    const { page, isChorus, source } = query;

    const isChorusDefine = isChorus;
    console.log(source);

    const [songs, total] = await getSongs({
      page,
      where: {
        metadata: {
          isChorus: isChorusDefine ? isChorus : undefined,
          source: {
            has: source,
          },
        },
      },
    });

    return SuccessResponse({
      data: songs,
      meta: getMeta({ currentPage: page || "1", total }),
      message: "Success fetching songs",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
