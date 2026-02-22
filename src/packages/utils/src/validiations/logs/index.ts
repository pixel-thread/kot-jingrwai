import { logsType } from "@repo/constants";
import z from "zod";
import { textOnlyValidiation } from "../common";

export const LogSchema = z.object({
  type: z.enum(logsType).default("LOG"),
  content: textOnlyValidiation.min(1, "Log content is required"),
  timestamp: textOnlyValidiation.refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date string",
  }),
  message: z.string().default("Unknown message"),
});
