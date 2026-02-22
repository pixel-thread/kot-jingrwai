import z from "zod";
import { AppPlatform, AppTags, AppUpdateType } from "@repo/constants";
import { appVersionValidiation, textOnlyValidiation } from "../common";

export const UpdateSchema = z.object({
  version: appVersionValidiation.min(1, "Version is required"),
  title: z.string(),
  description: z.array(textOnlyValidiation).optional(),
  platforms: z.array(z.enum(AppPlatform)).optional(),
  type: z.enum(AppUpdateType),
  releaseNotesUrl: z.string().optional(),
  downloadUrl: z.string().optional(),
  minSupportedVersion: appVersionValidiation.min(1, "Min Version is required").optional(),
  releaseDate: textOnlyValidiation,
  tags: z.array(z.enum(AppTags)),
  author: textOnlyValidiation.optional(),
  versionCode: z.int().optional(),
  buildNumber: z.int().optional(),
  runtimeVersion: textOnlyValidiation.optional(),
});
