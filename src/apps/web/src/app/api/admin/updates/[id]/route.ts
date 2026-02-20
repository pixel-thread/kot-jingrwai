import { deleteUpdate } from "@/services/appVersion/update/deleteUpdate";
import { getUniqueUpdate } from "@/services/appVersion/update/getUniqueUpdate";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredSuperAdminRole } from "@/utils/middleware/requiredSuperAdminRole";
import { requiredRole } from "@/utils/middleware/requireRole";
import { SuccessResponse } from "@/utils/next-response";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requiredRole(request, "SUPER_ADMIN");
    const id = (await params).id;
    const update = await getUniqueUpdate({ where: { id } });

    if (!update) {
      return new Response("Update not found", { status: 404 });
    }

    await deleteUpdate({ where: { id } });

    return SuccessResponse({ message: "Update deleted" });
  } catch (error) {
    return handleApiErrors(error);
  }
}
