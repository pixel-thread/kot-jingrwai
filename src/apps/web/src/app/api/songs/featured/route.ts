import { getSongs } from "@/services/songs/getSongs";
import { sanitize } from "@/utils/helper/sanitize";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { getMeta } from "@/utils/pagination/getMeta";
import { SongsResponseSchema } from "@repo/utils";

export const GET = withValidation({}, async () => {
  const randomPage = Math.floor(Math.random() * 64) + 1;

  const [songs, total] = await getSongs({
    page: randomPage.toString(),
    orderBy: { title: "asc" },
  });

  return SuccessResponse({
    data: sanitize(SongsResponseSchema, songs),
    meta: getMeta({ currentPage: 1, total }),
    message: "Success fetch featured songs",
  });
});
