import { deleteVerse } from "@/services/verse/deleteVerse";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { logger } from "@/utils/logger";
import { SuccessResponse } from "@/utils/next-response";

export async function DELETE(request: Request) {
  try {
    logger.info("Deleting all verses");
    const searchParams = new URL(request.url).searchParams;
    const isAll = searchParams.get("isAll") === "true";
    const id = searchParams.get("id");
    let response;
    if (isAll) {
      response = await deleteVerse({ isAll: true });
      return SuccessResponse({
        data: response,
        message: "Successfully deleted all verses",
      });
    } else if (id) {
      response = await deleteVerse({ id });
      return SuccessResponse({
        data: response,
        message: "Successfully deleted verse",
      });
    }
    return SuccessResponse({
      data: response,
      message: "Successfully deleted verse",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
