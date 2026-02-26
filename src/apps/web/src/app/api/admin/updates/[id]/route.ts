import { deleteUpdate } from "@/services/appVersion/update/deleteUpdate";
import { getUniqueUpdate } from "@/services/appVersion/update/getUniqueUpdate";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredRole } from "@/utils/middleware/requireRole";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { UUIDSchema } from "@repo/utils";
import z from "zod";

const RouteSchma = { params: z.object({ id: UUIDSchema }) };

export const DELETE = withValidation(RouteSchma, async ({ params }, req) => {
  try {
    await requiredRole(req, "SUPER_ADMIN");
    const id = params.id;
    const update = await getUniqueUpdate({ where: { id } });

    if (!update) {
      return new Response("Update not found", { status: 404 });
    }

    await deleteUpdate({ where: { id } });

    return SuccessResponse({ message: "Update deleted" });
  } catch (error) {
    return handleApiErrors(error);
  }
});
