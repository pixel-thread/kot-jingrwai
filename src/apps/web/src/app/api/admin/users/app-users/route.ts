import { getDownloadUsers } from "@/services/download/getDownloadUsers";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredSuperAdminRole } from "@/utils/middleware/requiredSuperAdminRole";
import { SuccessResponse } from "@/utils/next-response";
import { NextRequest } from "next/server";
import { convertUTCToIST } from "@repo/utils";

export async function GET(req: NextRequest) {
  try {
    await requiredSuperAdminRole(req);
    const users = await getDownloadUsers();
    const data = users.map((val) => ({
      ...val,
      lastLoginAt: convertUTCToIST(val.lastLoginAt),
      createdAt: convertUTCToIST(val.createdAt),
    }));
    return SuccessResponse({
      data,
      message: "success",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
