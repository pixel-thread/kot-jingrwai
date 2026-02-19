import z from "zod";

const tokenValidation = z.string("Token is required").min(1, "Token is required");

export const TokenSchema = z
  .object({
    refreshToken: tokenValidation,
  })
  .strict();

export const RefreshTokenResponseSchema = z.object({
  accessToken: tokenValidation.optional().nullable(),
  refreshToken: tokenValidation.optional().nullable(),
});
