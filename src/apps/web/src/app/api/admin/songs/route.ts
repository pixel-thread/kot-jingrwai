import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { SongSchema } from "@repo/utils";

export const POST = withValidation({ body: SongSchema }, async ({ body }) => {
  try {
    return SuccessResponse({
      data: body,
      message: "Successfully created song",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
