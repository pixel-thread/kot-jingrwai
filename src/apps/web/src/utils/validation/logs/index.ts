import z from "zod";

export const LogSchema = z.object({
  type: z.enum(["ERROR", "INFO", "WARN", "LOG"]),
  content: z.string("Log content is required"),
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date string",
  }),
  message: z.string().default("Unknown message"),
});
