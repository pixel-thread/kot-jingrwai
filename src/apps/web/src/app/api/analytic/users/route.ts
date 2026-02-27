import { addDownloadedUser } from "@/services/download/addDownloadedUser";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { UserAnalyticSchema } from "@repo/utils";

export const POST = withValidation({ body: UserAnalyticSchema }, async ({ body }) => {
  await addDownloadedUser({
    where: { userId: body.userId },
    create: {
      userId: body.userId,
      appVersion: body.appVersion,
      lastLoginAt: new Date(),
    },
    update: {
      appVersion: body.appVersion,
      lastLoginAt: new Date(),
    },
  });

  return SuccessResponse({ message: "Successfully sync user" });
});
