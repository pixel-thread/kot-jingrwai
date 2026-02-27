import { requireAuth } from "@/utils/middleware/requireAuth";
import { SuccessResponse } from "@src/utils/next-response";
import { sanitize } from "@/utils/helper/sanitize";
import { MeAuthResponseSchema } from "@repo/utils";
import { withValidation } from "@/utils/middleware/withValidiation";

export const GET = withValidation({}, async ({}, req) => {
  const auth = await requireAuth(req);
  return SuccessResponse({
    data: sanitize(MeAuthResponseSchema, auth),
    message: "Successfully fetched user details",
  });
});
