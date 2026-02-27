import { getDownloadUsers } from "@/services/download/getDownloadUsers";
import { requiredSuperAdminRole } from "@/utils/middleware/requiredSuperAdminRole";
import { SuccessResponse } from "@/utils/next-response";
import { convertUTCToIST, pageValidation } from "@repo/utils";
import { sanitize } from "@/utils/helper/sanitize";
import { UserAnalyticSchema } from "@repo/utils";
import { withValidation } from "@/utils/middleware/withValidiation";
import z from "zod";

const RouteSchema = {
  query: z.object({ page: pageValidation }),
};
export const GET = withValidation(RouteSchema, async ({ query }, req) => {
  const page = query.page;
  await requiredSuperAdminRole(req);
  const users = await getDownloadUsers({ page });
  const data = users.map((val) => ({
    ...val,
    lastLoginAt: convertUTCToIST(val.lastLoginAt),
    createdAt: convertUTCToIST(val.createdAt),
  }));
  return SuccessResponse({
    data: sanitize(UserAnalyticSchema, data),
    message: "Successfully fetched users",
  });
});
