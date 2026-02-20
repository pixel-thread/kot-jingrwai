import z from "zod";

export const LineSchema = z
  .object({
    text: z.string().min(1, "Line is required").max(1000, "Line too long (max 1000 chars)"),
    isPaidBah: z.boolean(),
    order: z.coerce.number(),
  })
  .strict();

export const ResponseLineSchema = z.object({
  text: z.string().min(1, "Line is required").max(1000, "Line too long (max 1000 chars)"),
  isPaidBah: z.boolean(),
  order: z.coerce.number(),
});
