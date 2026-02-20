import z from "zod";

export function sanitize<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
