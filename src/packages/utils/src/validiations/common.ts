import z from "zod";
import {
  specialCharsRegx,
  textOnlyRegx,
  numericRegx,
  lowerCaseRegx,
  upperCaseRegx,
  appSource,
  verseTypes,
} from "@repo/constants";

export const emailValidation = z.email("Email is required").trim();

export const passwordValidation = z
  .string("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be less than 64 characters")
  .regex(lowerCaseRegx, "Must contain a lowercase letter")
  .regex(upperCaseRegx, "Must contain an uppercase letter")
  .regex(numericRegx, "Must contain a number")
  .regex(specialCharsRegx, "Must contain a special character");

export const phoneValidiation = z
  .string("Phone number is required")
  .refine((val) => !specialCharsRegx.test(val), {
    message: "Phone number must not contain special characters",
  })
  .refine((val) => !textOnlyRegx.test(val), {
    message: "Phone number must only contain numbers",
  })
  .refine((val) => !numericRegx.test(val), {
    message: "Phone number must only contain numbers",
  })
  .min(10, "Phone number is required")
  .max(10, "Phone number must be 10 digits");

export const otpValidiation = z
  .string("OTP is required")
  .refine((val) => !specialCharsRegx.test(val), {
    message: "Otp must not contain special characters",
  })
  .refine((val) => !textOnlyRegx.test(val), {
    message: "Otp number must only contain numbers",
  })
  .refine((val) => !numericRegx.test(val), {
    message: "Otp number must only contain numbers",
  })
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
