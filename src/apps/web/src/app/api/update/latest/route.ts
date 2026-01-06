import { getLatestUpdate } from "@/services/appVersion/getLatestUpdate";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { SuccessResponse } from "@/utils/next-response";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log(req);
    }
    const update = await getLatestUpdate();
    return SuccessResponse({
      data: update,
      message: "Successfully fetched latest update",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
