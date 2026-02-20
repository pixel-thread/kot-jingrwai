import { addDownloadedUser } from "@/services/download/addDownloadedUser";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { SuccessResponse } from "@/utils/next-response";
import { UserAnalyticSchema } from "@/utils/validation/analytic/user";

export async function POST(req: Request) {
  try {
    const body = UserAnalyticSchema.parse(await req.json());

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

    return SuccessResponse({
      message: "Successfully downloaded user",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
