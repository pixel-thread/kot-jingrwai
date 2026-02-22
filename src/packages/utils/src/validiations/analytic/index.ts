import z from "zod";
import { textOnlyValidiation } from "../common";

export const UserAnalyticSchema = z.object({
  userId: z.uuid("Invalid user id").trim(),
  appVersion: textOnlyValidiation.trim(),
});
