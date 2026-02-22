import { getSongs } from "@/services/songs/getSongs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { SuccessResponse } from "@/utils/next-response";
import { getMeta } from "@/utils/pagination/getMeta";
import { SongsResponseSchema } from "@repo/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const randomPage = Math.floor(Math.random() * 64) + 1;

    const [songs, total] = await getSongs({
      page: randomPage.toString(),
      orderBy: { title: "asc" },
    });

    return SuccessResponse({
      data: sanitize(SongsResponseSchema, songs),
      meta: getMeta({ currentPage: randomPage.toString(), total }),
      message: "Success fetch featured songs",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
