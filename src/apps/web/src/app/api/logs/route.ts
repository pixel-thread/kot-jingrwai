import { addLogs } from "@/services/logs/addLogs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { LogSchema } from "@/utils/validation/logs";

export const POST = withValidation({ body: LogSchema }, async ({ body }) => {
  try {
    await addLogs({ data: body });
    return SuccessResponse({ message: "Log saved successfully" });
  } catch (error) {
    return handleApiErrors(error);
  }
});
