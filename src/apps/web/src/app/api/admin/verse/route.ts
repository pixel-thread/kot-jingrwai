import { deleteVerse } from "@/services/verse/deleteVerse";
import { logger } from "@/utils/logger";
import { requiredRole } from "@/utils/middleware/requireRole";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";

export const DELETE = withValidation({}, async ({}, req) => {
  requiredRole(req, "SUPER_ADMIN");
  logger.info("Deleting all verses");
  const searchParams = new URL(req.url).searchParams;
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
  return SuccessResponse({ message: "Successfully deleted verse" });
});
