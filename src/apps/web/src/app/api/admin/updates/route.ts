import { createUpdate } from "@/services/appVersion/update/createUpdate";
import { getUpdates } from "@/services/appVersion/update/getUpdates";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { requiredSuperAdminRole } from "@/utils/middleware/requiredSuperAdminRole";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { UpdateSchema } from "@/utils/validation/update";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await requiredSuperAdminRole(request);
    const updates = await getUpdates({ where: {} });
    return SuccessResponse({ data: sanitize(UpdateSchema, updates) });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = UpdateSchema.parse(await request.json());

    const isVersionExists = await getUpdates({
      where: { version: body.version },
    });

    if (isVersionExists.length > 0) {
      return ErrorResponse({
        message: "Version already exists",
        data: { isVersionExists },
      });
    }

    const version = await createUpdate({
      data: {
        version: body.version,
        title: body.title,
        description: body.description,
        platforms: body.platforms,
        releaseNotesUrl: body.releaseNotesUrl,
        type: body.type,
        tags: body.tags,
        minSupportedVersion: body.minSupportedVersion,
        releaseDate: new Date(),
        author: body.author,
      },
    });

    return SuccessResponse({ message: "version created", data: version });
  } catch (error) {
    return handleApiErrors(error);
  }
}
