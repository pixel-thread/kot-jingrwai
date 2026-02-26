import {
  AppVersionPlatform,
  AppVersionTags,
  AppVersionType,
} from "@/lib/database/prisma/generated/prisma";
import { createUpdate } from "@/services/appVersion/update/createUpdate";
import { getUpdates } from "@/services/appVersion/update/getUpdates";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { requiredRole } from "@/utils/middleware/requireRole";
import { withValidation } from "@/utils/middleware/withValidiation";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { ResponseUpdateSchema, UpdateSchema } from "@repo/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await requiredRole(request, "SUPER_ADMIN");
    const updates = getUpdates({ where: {} });
    return SuccessResponse({
      data: sanitize(ResponseUpdateSchema, updates),
      message: "Successfully fetched updates",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}

const RouteSchema = { body: UpdateSchema };

export const POST = withValidation(RouteSchema, async ({ body }, req) => {
  try {
    await requiredRole(req, "SUPER_ADMIN");

    const versionExists = await getUpdates({
      where: { version: body.version },
    });

    if (versionExists.length > 0) {
      return ErrorResponse({
        message: "Version already exists",
        data: sanitize(ResponseUpdateSchema, versionExists),
      });
    }

    const version = await createUpdate({
      data: {
        version: body.version,
        title: body.title,
        description: body.description,
        platforms: body.platforms as AppVersionPlatform[],
        releaseNotesUrl: body.releaseNotesUrl,
        type: body.type as AppVersionType,
        tags: body.tags as AppVersionTags[],
        minSupportedVersion: body.minSupportedVersion,
        releaseDate: new Date(),
        author: body.author,
      },
    });

    return SuccessResponse({
      message: "Successfully created update version",
      data: sanitize(ResponseUpdateSchema, version),
      status: 201,
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
