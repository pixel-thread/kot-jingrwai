import { logsType } from "@repo/constants";
import z from "zod";

export const LogSchema = z.object({
  type: z.enum(logsType).default("LOG"),
  content: z.string("Log content is required"),
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date string",
  }),
  message: z.string().default("Unknown message"),
});
