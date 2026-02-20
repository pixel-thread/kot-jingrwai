import z from "zod";

export const source = ["KOT_JINGRWAI", "LYNTI_BNENG"];

export const passwordValidation = z
  .string("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be less than 64 characters")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/\d/, "Must contain a number")
  .regex(/[!@#$%^&*(),.?":{}|<>_\-\\[\]`~+=;/]/, "Must contain a special character");

export const phoneValidiation = z
  .string("Phone number is required")
  .min(10, "Phone number is required")
  .max(10, "Phone number must be 10 digits");

export const otpValidiation = z
  .string("OTP is required")
  .min(6, "OTP is required")
  .max(6, "OTP must be 6 digits");

export const dateValidiation = z.coerce.date("Date is required");

const verseTypes = ["VERSE", "CHORUS", "BRIDGE", "INTRO", "OUTRO"];

export const VerseTypeValidiation = z
  .enum(verseTypes)
  .optional()
  .refine((val) => !val || Object.values(verseTypes).includes(val), {
    message: "Invalid verse type. Must be INTRO, CHORUS, VERSE, BRIDGE, or OUTRO",
  })
  .default("VERSE");

export const UUIDSchema = z.uuid("Must be a valid UUID format");

export const sourceValidiation = z
  .enum(source)
  .refine((val) => !val || Object.values(source).includes(val), {
    message: "Source must be one of the app",
  })
  .default("KOT_JINGRWAI");
