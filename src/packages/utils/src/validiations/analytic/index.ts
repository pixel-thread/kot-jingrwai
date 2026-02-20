import z from "zod";

export const UserAnalyticSchema = z.object({
  userId: z.uuid("Invalid user id").trim(),
  appVersion: z.string("Invalid app version").trim(),
});
