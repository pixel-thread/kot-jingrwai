import { z } from "zod";

import {
  emailValidation,
  nameValidiation,
  otpValidiation,
  passwordValidation,
  phoneValidiation,
} from "..";

import { $Enums } from "@/lib/database/prisma/generated/prisma";

export const LoginSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
  })
  .strict();

export const SignUpSchema = LoginSchema.extend({
  email: emailValidation,
  name: nameValidiation,
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
      return ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirm_password", "password"],
      });
    }
  })
  .strict();

export const MeAuthResponseSchema = z.object({
  email: emailValidation.nullable().optional(),
  name: nameValidiation,
  phone_no: phoneValidiation.nullable().optional(),
  hasImage: z.boolean().default(false),
  imageUrl: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  role: z.enum([$Enums.Role.USER, $Enums.Role.ADMIN, $Enums.Role.SUPER_ADMIN]),
});
