import { deleteVerse } from "@/services/verse/deleteVerse";
import { logger } from "@/utils/logger";
import { requiredRole } from "@/utils/middleware/requireRole";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { UUIDSchema } from "@repo/utils";
import { z } from "zod";

const RouteSchema = {
  query: z.object({
    id: UUIDSchema,
    isAll: z.coerce
      .boolean()
      .transform((val) => Boolean(val))
      .catch(false),
  }),
};

export const DELETE = withValidation(RouteSchema, async ({ query }, req) => {
  requiredRole(req, "SUPER_ADMIN");
  logger.info("Deleting all verses");
  const isAll = query.isAll;
  const id = query.id;
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
