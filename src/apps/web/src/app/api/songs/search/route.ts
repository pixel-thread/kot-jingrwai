import { getSongs } from "@/services/songs/getSongs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { SuccessResponse } from "@/utils/next-response";
import { getMeta } from "@/utils/pagination/getMeta";
import { SongsResponseSchema } from "@/utils/validation/songs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");
    const query = req.nextUrl.searchParams.get("query") || "";
    const isChorus = req.nextUrl.searchParams.get("isChorus") === "true";

    const queryNumber = Number(query);
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
              contains: query,
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
                      contains: query,
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
}
