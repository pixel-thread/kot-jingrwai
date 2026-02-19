import z from "zod";

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

export const nameValidiation = z
  .string()
  .min(1, "First name is required")
  .regex(/^[a-zA-Z]+$/, "First name must only contain letters");

export const emailValidation = z.email("Email is required");
