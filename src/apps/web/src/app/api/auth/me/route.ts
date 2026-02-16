import { handleApiErrors } from "@src/utils/errors/handleApiErrors";
import { requireAuth } from "@/utils/middleware/requireAuth";
import { SuccessResponse } from "@src/utils/next-response";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    console.log(auth);
    return SuccessResponse({
      data: auth,
      message: "Successfully fetched user details",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
