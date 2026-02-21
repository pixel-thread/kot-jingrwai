import { handleApiErrors } from "@utils/errors/handleApiErrors";
import { ErrorResponse, SuccessResponse } from "@utils/next-response";
import { AuthServices } from "@services/auth";
import { BcryptService } from "@src/lib/auth/bcrypt";
import { TokenServices } from "@src/services/tokens";
import { JWT } from "@libs/auth/jwt";
import { withValidation } from "@src/utils/middleware/withValidiation";
import { sanitize } from "@/utils/helper/sanitize";
import { RefreshTokenResponseSchema, LoginSchema } from "@repo/utils";
import { AttempServices } from "@/services/auth/attempt";
import { AccountLockServices } from "@/services/auth/lock";
import { calculateLockUntil } from "@/utils/helper/getTime";

export const POST = withValidation({ body: LoginSchema }, async ({ body }, req) => {
  try {
    const now = new Date();

    // Define rolling window for failed attempts (last 15 minutes)
    // Only count failed attempts within this time frame
    const rollingWindowMinutes = 15;
    const windowStart = new Date(now.getTime() - rollingWindowMinutes * 60 * 1000);

    //  Check if account is currently locked
    // lockedUntil >= now means user is still locked
    const lockedAccount = await AccountLockServices.findFirst({
      where: { email: body.email, lockedUntil: { gte: now } },
    });

    if (lockedAccount) {
      // Generic message to avoid leaking info about exact lock time
      return ErrorResponse({
        message: "Account temporarily locked. Please try again later.",
        status: 403,
      });
    }

    //  Retrieve user by email
    const auth = await AuthServices.getUnique({
      where: { email: body.email },
    });

    //  Count failed login attempts for this email in rolling window
    const failedCount = await AttempServices.count({
      where: {
        email: body.email,
        type: "LOGIN",
        success: false,
        createdAt: { gte: windowStart },
      },
    });

    //  Check credentials
    const isInvalidCredential =
      !auth || !(await BcryptService.compare(body.password, auth.hashPassword));

    if (isInvalidCredential) {
      //  Determine client IP from headers (Next.js does not have req.ip)
      const clientIp =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        "unknown";

      //  Record failed login attempt
      await AttempServices.create({
        data: {
          email: body.email,
          type: "LOGIN",
          success: false,
          ipAddress: clientIp, // optional for audit / brute-force protection
        },
      });

      // Calculate remaining attempts before lock
      const attemptsLeft = Math.max(0, 3 - (failedCount + 1));

      // Lock account if failed attempts exceed threshold
      if (failedCount + 1 >= 3) {
        const lockUntil = calculateLockUntil(failedCount + 1); // progressive lock duration
        await AccountLockServices.create({
          data: {
            email: body.email,
            reason: "TOO_MANY_FAILED_LOGIN_ATTEMPTS",
            lockedUntil: lockUntil,
          },
        });

        // Generic error to prevent user enumeration
        return ErrorResponse({
          message: "Account temporarily locked due to multiple failed login attempts.",
          status: 403,
        });
      }

      // Return remaining attempts for UX (optional, but still generic)
      return ErrorResponse({
        message: `Invalid email or password. ${attemptsLeft} attempt(s) remaining.`,
        status: 401,
      });
    }

    // Successful login → generate tokens
    const accessToken = await JWT.signAccessToken({ userId: auth.userId });
    const refreshToken = await JWT.signRefreshToken({ userId: auth.userId });

    // Store refresh token hash in DB (never store plaintext)
    await TokenServices.createToken({
      userId: auth.userId,
      hash: refreshToken,
      authId: auth.id,
    });

    // Return sanitized response with access + refresh tokens
    return SuccessResponse({
      message: "Successfully logged in",
      data: sanitize(RefreshTokenResponseSchema, {
        accessToken,
        refreshToken,
      }),
    });
  } catch (error) {
    // Catch and handle all unexpected errors
    return handleApiErrors(error);
  }
});
