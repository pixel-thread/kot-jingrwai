import { SongService } from "@/services/songs";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredRole } from "@/utils/middleware/requireRole";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { SongSchema } from "@repo/utils";

export const POST = withValidation({ body: SongSchema }, async ({ body }, req) => {
  try {
    await requiredRole(req, "ADMIN");

    const result = await SongService.create({ data: body });

    return SuccessResponse({
      data: result,
      message: "Successfully created song with prayers and metadata",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
