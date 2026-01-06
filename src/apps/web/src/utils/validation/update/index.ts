import { $Enums } from "@/lib/database/prisma/generated/prisma";
import z from "zod";

export const UpdateSchema = z.object({
  version: z
    .string()
    .min(1, "Version is required")
    .regex(/^\d+\.\d+\.\d+$/, "Version must be in format X.Y.Z (e.g., 1.0.0)"),
  title: z.string(),
  description: z.array(z.string()).optional(),
  platforms: z
    .array(z.enum([$Enums.AppVersionPlatform.ANDROID, $Enums.AppVersionPlatform.IOS]))
    .optional(),
  type: z.enum([$Enums.AppVersionType.PTA, $Enums.AppVersionType.OTA]),
  releaseNotesUrl: z.string().optional(),
  downloadUrl: z.string().optional(),
  minSupportedVersion: z
    .string()
    .min(1, "Min Version is required")
    .regex(/^\d+\.\d+\.\d+$/, "Min Version must be in format X.Y.Z (e.g., 1.0.0)")
    .optional(),
  releaseDate: z.string(),
  tags: z.array(
    z.enum([
      $Enums.AppVersionTags.BETA,
      $Enums.AppVersionTags.STABLE,
      $Enums.AppVersionTags.PATCH,
      $Enums.AppVersionTags.BUGFIX,
    ])
  ),
  author: z.string().optional(),
  versionCode: z.int().optional(),
  buildNumber: z.int().optional(),
  runtimeVersion: z.string().optional(),
});
