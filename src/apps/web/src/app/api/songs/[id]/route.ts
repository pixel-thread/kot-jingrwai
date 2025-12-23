import { getUniqueSongs } from "@/services/songs/getUniqueSong";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { SuccessResponse } from "@/utils/next-response";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log(req);
    }
    const id = (await params).id;
    const song = await getUniqueSongs({ where: { id } });
    return SuccessResponse({
      data: song,
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
