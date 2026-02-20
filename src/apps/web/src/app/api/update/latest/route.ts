import { getLatestUpdate } from "@/services/appVersion/getLatestUpdate";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { UpdateSchema } from "@/utils/validation/update";

export const GET = withValidation({}, async () => {
  try {
    const update = await getLatestUpdate();

    return SuccessResponse({
      data: sanitize(UpdateSchema.optional().nullable(), update),
      message: "Successfully fetched latest update",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
