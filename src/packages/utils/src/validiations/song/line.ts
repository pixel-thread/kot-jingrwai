import z from "zod";
import { textOnlyValidiation } from "../common";

export const LineSchema = z
  .object({
    text: textOnlyValidiation
      .min(1, "Line is required")
      .max(1000, "Line too long (max 1000 chars)"),
    isPaidBah: z.boolean(),
    order: z.coerce.number(),
  })
  .strict();

export const ResponseLineSchema = z.object({
  text: textOnlyValidiation.min(1, "Line is required").max(1000, "Line too long (max 1000 chars)"),
  isPaidBah: z.boolean(),
  order: z.coerce.number(),
});
