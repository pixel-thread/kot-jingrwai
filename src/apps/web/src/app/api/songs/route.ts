import { getSongs } from "@/services/songs/getSongs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { SuccessResponse } from "@/utils/next-response";
import { getMeta } from "@/utils/pagination/getMeta";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");
    const chorus = req.nextUrl.searchParams.get("isChorus");

    const isChorusDefine = chorus;

    const isChorus = req.nextUrl.searchParams.get("isChorus") === "true" || false;

    const [songs, total] = await getSongs({
      page,
      where: { metadata: { isChorus: isChorusDefine ? isChorus : undefined } },
    });

    return SuccessResponse({
      data: songs,
      meta: getMeta({ currentPage: page || "1", total }),
      message: "Success fetching songs",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
