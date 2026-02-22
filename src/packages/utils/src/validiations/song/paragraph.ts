import z from "zod";
import { VerseTypeValidiation } from "../common";
import { LineSchema, ResponseLineSchema } from "./line";

export const ParagraphSchema = z
  .object({
    order: z.coerce
      .number()
      .int("Order must be an integer")
      .positive("Order must be positive")
      .max(999, "Order too high (max 999)"),
    lines: z.array(LineSchema).min(1, "At least one line required"),
    type: VerseTypeValidiation,
  })
  .strict();

export const ResponseParagraphSchema = z.object({
  order: z.coerce
    .number()
    .int("Order must be an integer")
    .positive("Order must be positive")
    .max(999, "Order too high (max 999)"),
  lines: z.array(ResponseLineSchema).min(1, "At least one line required"),
  type: VerseTypeValidiation,
});
