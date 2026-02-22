import z from "zod";
import { dateValidiation, UUIDSchema } from "../common";
import { LineSchema } from "./line";

export const PrayerSchema = z.object({
  lines: z.array(LineSchema),
  updatedAt: dateValidiation.optional(),
  createdAt: dateValidiation.optional(),
});

export const ResponsePrayerSchema = z.object({
  id: UUIDSchema,
  lines: z.array(LineSchema),
});
