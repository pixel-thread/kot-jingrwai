import { z } from "zod";

import { otpValidiation, passwordValidation, phoneValidiation } from "../common";

export const LoginSchema = z
  .object({
    email: z.email("Email is required"),
    password: passwordValidation,
  })
  .strict();

export const SignUpSchema = LoginSchema.extend({
  email: z.email("Email is required"),
  name: z
    .string()
    .min(1, "First name is required")
    .regex(/^[a-zA-Z]+$/, "First name must only contain letters"),
  password: passwordValidation,
  confirmPassword: passwordValidation,
})
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword", "password"],
      });
    }
  })
  .strict();

export const ForgotPasswordSchema = z
  .object({
    otp: otpValidiation,
    phone_no: phoneValidiation,
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirm_password", "password"],
      });
    }
  })
  .strict();
