import { getLatestUpdate } from "@/services/appVersion/getLatestUpdate";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";

export const GET = withValidation({}, async () => {
  try {
    const update = await getLatestUpdate();

    return SuccessResponse({
      data: update,
      message: "Successfully fetched latest update",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
