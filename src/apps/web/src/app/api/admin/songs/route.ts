import { SongService } from "@/services/songs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { requiredRole } from "@/utils/middleware/requireRole";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { SongResponseSchema } from "@/utils/validation/songs";
import { SongSchema } from "@repo/utils";

export const POST = withValidation({ body: SongSchema }, async ({ body }, req) => {
  try {
    await requiredRole(req, "ADMIN");

    const result = await SongService.create({ data: body });

    return SuccessResponse({
      data: sanitize(SongResponseSchema, result),
      message: "Successfully created song with prayers and metadata",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
