import z from "zod";
import {
  specialCharsRegx,
  textOnlyRegx,
  numericOnlyRegx,
  lowerCaseRegx,
  upperCaseRegx,
  appSource,
  verseTypes,
  appVersionRegx,
  INT4_MAX,
  INT4_MIN,
} from "@repo/constants";

export const emailValidation = z.email("Email is required").trim().toLowerCase();

export const passwordValidation = z
  .string("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be less than 64 characters")
  .regex(lowerCaseRegx, "Must contain a lowercase letter")
  .regex(upperCaseRegx, "Must contain an uppercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(specialCharsRegx, "Must contain a special character");

export const phoneValidiation = z
  .string("Phone number is required")
  .regex(numericOnlyRegx, "Phone number must only contain numbers")
  .min(10, "Phone number is required")
  .max(10, "Phone number must be 10 digits");

export const otpValidiation = z
  .string("OTP is required")
  .regex(numericOnlyRegx, "otp number must only contain numbers")
  .min(6, "OTP is required")
  .max(6, "OTP must be 6 digits");

export const dateValidiation = z.coerce.date("Date is required");

export const VerseTypeValidiation = z
  .enum(verseTypes)
  .optional()
  .refine((val) => !val || Object.values(verseTypes).includes(val), {
    message: "Invalid verse type. Must be INTRO, CHORUS, VERSE, BRIDGE, or OUTRO",
  })
  .default("VERSE");

export const UUIDSchema = z.uuid("Must be a valid UUID format");

export const sourceValidiation = z
  .enum(appSource)
  .refine((val) => !val || Object.values(appSource).includes(val), {
    message: "Source must be one of the app",
  })
  .default("KOT_JINGRWAI");

export const nameValidiation = z
  .string()
  .min(1, "First name is required")
  .regex(textOnlyRegx, "First name must only contain letters");

export const textOnlyValidiation = z.string("Must only contain letters");

export const appVersionValidiation = z
  .string()
  .regex(appVersionRegx, "Min Version must be in format X.Y.Z (e.g., 1.0.0)");

export const pageValidation = z.coerce
  .string()
  .regex(/^\d+$/, "Page must contain only numbers")
  .min(1, "Page cannot be empty")
  .max(5, "Page cannot exceed 5 digits")
  .transform((val) => Number(val))
  .pipe(z.number().positive("Page must be greater than 0"))
  .catch(1);

export const searchQueryValidiation = z
  .preprocess(
    (val) => (typeof val === "string" ? val : ""),
    z
      .string()
      .max(100, "Please enter a valid search query")
      .transform((val) => val.replace(/[^a-zA-Z0-9]/g, ""))
      .transform((val) => val.toLowerCase())
      .refine((val) => {
        if (!val) return true;

        const num = Number(val);

        if (Number.isNaN(num)) return true;

        return num <= INT4_MAX && num >= INT4_MIN;
      }, "Please enter a valid search query")
  )
  .catch("1")
  .optional();
