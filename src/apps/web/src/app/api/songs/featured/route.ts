import { getSongs } from "@/services/songs/getSongs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { logger } from "@/utils/logger";
import { SuccessResponse } from "@/utils/next-response";
import { getMeta } from "@/utils/pagination/getMeta";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    logger.log(req ? "Get Featured Songs" : "Get Featured Songs");
    const randomPage = Math.floor(Math.random() * 64) + 1;

    const [songs, total] = await getSongs({
      page: randomPage.toString(),
      orderBy: {
        title: "asc",
      },
    });

    return SuccessResponse({
      data: songs,
      meta: getMeta({ currentPage: randomPage.toString(), total }),
      message: "Success fetch featured songs",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
