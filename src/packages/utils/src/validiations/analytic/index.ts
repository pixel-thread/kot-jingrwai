import z from "zod";
import { appVersionValidiation } from "../common";

export const UserAnalyticSchema = z.object({
  userId: z.uuid("Invalid user id").trim(),
  appVersion: appVersionValidiation.trim(),
});
