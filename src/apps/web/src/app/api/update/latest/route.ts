import { getLatestUpdate } from "@/services/appVersion/getLatestUpdate";
import { sanitize } from "@/utils/helper/sanitize";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { UpdateSchema } from "@repo/utils";

export const GET = withValidation({}, async () => {
  const update = await getLatestUpdate();

  return SuccessResponse({
    data: sanitize(UpdateSchema.optional().nullable(), update),
    message: "Successfully fetched latest update",
  });
});
