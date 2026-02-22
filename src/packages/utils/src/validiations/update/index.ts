import z from "zod";
import { AppPlatform, AppTags, AppUpdateType } from "@repo/constants";

export const UpdateSchema = z.object({
  version: z
    .string()
    .min(1, "Version is required")
    .regex(/^\d+\.\d+\.\d+$/, "Version must be in format X.Y.Z (e.g., 1.0.0)"),
  title: z.string(),
  description: z.array(z.string()).optional(),
  platforms: z.array(z.enum(AppPlatform)).optional(),
  type: z.enum(AppUpdateType),
  releaseNotesUrl: z.string().optional(),
  downloadUrl: z.string().optional(),
  minSupportedVersion: z
    .string()
    .min(1, "Min Version is required")
    .regex(/^\d+\.\d+\.\d+$/, "Min Version must be in format X.Y.Z (e.g., 1.0.0)")
    .optional(),
  releaseDate: z.string(),
  tags: z.array(z.enum(AppTags)),
  author: z.string().optional(),
  versionCode: z.int().optional(),
  buildNumber: z.int().optional(),
  runtimeVersion: z.string().optional(),
});
