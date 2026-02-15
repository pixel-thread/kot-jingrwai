import { getLatestUpdate } from "@/services/appVersion/getLatestUpdate";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { SuccessResponse } from "@/utils/next-response";
import { logger } from "@repo/utils";
import { NextRequest } from "next/server";

const MOCK_DATA = {
  id: "738bc74a-7246-4b2f-9f82-fa19bdffd2bc",
  version: "1.0.3",
  title: "Build 1.0.0",
  description: [
    "v1",
    "1. Auto update",
    "2. Update onboarding",
    "3. Update release workflow",
    "4. Sync User number tracking",
  ],
  releaseNotesUrl: null,
  releaseDate: "2025-12-11 11:53:07.702",
  minSupportedVersion: null,
  author: "pixel-thread-personal",
  tags: ["ios"],
  additionalInfo: {
    buildId: "01ff33ec-6e58-49df-aed8-c389e7e02ddb",
    channel: "production",
    profile: "production",
  },
  status: "ACTIVE",
  createdAt: "2025-12-11 11:53:07.702",
  updatedAt: "2025-12-11 11:53:07.702",
  downloadUrl: "https://expo.dev/artifacts/eas/fivuSfzB7UdVay8nnNFQx.apk",
  type: "OTA",
  platforms: ["IOS"],
  buildNumber: null,
  runtimeVersion: null,
  versionCode: null,
};

export async function GET(req: NextRequest) {
  try {
    if (process.env.NODE_ENV === "development") {
      logger.log(req);
    }

    const update = await getLatestUpdate();

    return SuccessResponse({
      data: update,
      message: "Successfully fetched latest update",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
