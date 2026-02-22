import { ErrorResponse } from "@/utils/next-response";
import { ZodError } from "zod";
import { logger } from "@/utils/logger";
import { UnauthorizedError } from "@/utils/errors/unAuthError";
import {
  PrismaClientInitializationError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import * as JoseErrors from "jose/errors";

/**
 * Checks if an error is a specific JWT/JWS/JWE error thrown by the 'jose' library.
 */

const isJwtError = (error: unknown): boolean => {
  // Check if it's an explicit Jose subclass
  const isJoseClass =
    error instanceof JoseErrors.JOSEError || // Base class for all jose-specific errors
    error instanceof JoseErrors.JWTExpired ||
    error instanceof JoseErrors.JWTInvalid ||
    error instanceof JoseErrors.JWSSignatureVerificationFailed ||
    error instanceof JoseErrors.JWTClaimValidationFailed ||
    error instanceof JoseErrors.JWSInvalid ||
    error instanceof JoseErrors.JWKSInvalid ||
    error instanceof JoseErrors.JWKSTimeout ||
    error instanceof JoseErrors.JWKInvalid ||
    error instanceof JoseErrors.JOSEAlgNotAllowed ||
    error instanceof JoseErrors.JOSENotSupported ||
    error instanceof JoseErrors.JWSSignatureVerificationFailed ||
    error instanceof JoseErrors.JWEInvalid ||
    error instanceof JoseErrors.JWEDecryptionFailed;

  if (isJoseClass) return true;

  // Catch the specific "none algorithm" TypeErrors thrown by jose
  if (error instanceof TypeError || error instanceof Error) {
    const msg = error.message;
    return (
      msg.includes("jose") ||
      msg.includes("JWT") ||
      msg.includes("JWK") ||
      msg.includes("algorithm") ||
      msg.includes("CryptoKey")
    );
  }

  return false;
};
export const handleApiErrors = (error: unknown) => {
  if (isJwtError(error)) {
    return ErrorResponse({
      message: "Unauthorized",
      status: 401,
    });
  }

  if (error instanceof PrismaClientInitializationError) {
    return ErrorResponse({ message: error.message, status: 400 });
  }

  if (error instanceof PrismaClientValidationError) {
    return ErrorResponse({ message: error.message, status: 400 });
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    return ErrorResponse({ message: error.message, status: 400 });
  }

  if (error instanceof ZodError) {
    logger.error({
      type: "ZodError",
      message: error?.issues[0]?.message,
      error: error,
    });
    return ErrorResponse({
      message: error?.issues[0]?.message,
      status: 400,
    });
  }

  if (error instanceof UnauthorizedError) {
    return ErrorResponse({
      message: error.message || "Unauthorized",
      status: error.status,
    });
  }
  if (error instanceof Error) {
    logger.error({ type: "Error", message: error.message, error });
    return ErrorResponse({ message: error.message });
  }

  logger.error({
    type: "UnknownError",
    message: "Internal Server Error",
    error,
  });

  return ErrorResponse({ message: "Internal Server Error" });
};
