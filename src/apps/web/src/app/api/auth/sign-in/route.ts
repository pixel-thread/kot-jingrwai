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
import { withTimeout } from "@/utils/middleware/withTimeout";

const loginHandler = withValidation({ body: LoginSchema.strict() }, async ({ body }, req) => {
  try {
    const now = new Date();
    const normalReq = req as any;
    const clientIp =
      normalReq.ip ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      "unknown";

    // 1. Unified Lock Check (IP + Email)
    const activeLock = await AccountLockServices.findFirst({
      where: {
        OR: [{ email: body.email }],
        lockedUntil: { gte: now },
      },
    });

    if (activeLock) {
      return ErrorResponse({
        message: "Too many attempts. Please try again later.",
        status: 403,
      });
    }

    // 2. Fetch User & Prepare Timing Defense
    const auth = await AuthServices.getUnique({ where: { email: body.email } });

    const isPasswordCorrect = auth
      ? await BcryptService.compare(body.password, auth.hashPassword)
      : await BcryptService.dummyCompare();

    // 3. Handle Authentication Failure
    if (!isPasswordCorrect || !auth) {
      // Record the failure and get the updated count in one transaction-like flow
      // We use the email and IP to track brute force across different levels
      await AttempServices.create({
        data: {
          email: body.email,
          type: "LOGIN",
          success: false,
          ipAddress: clientIp,
        },
      });

      const rollingWindow = new Date(now.getTime() - 15 * 60 * 1000);
      const failedCount = await AttempServices.count({
        where: {
          email: body.email,
          ipAddress: clientIp,
          type: "LOGIN",
          success: false,
          createdAt: { gte: rollingWindow },
        },
      });

      const MAX_ATTEMPTS = 3;

      if (failedCount >= MAX_ATTEMPTS) {
        await AccountLockServices.create({
          data: {
            email: body.email,
            reason: "TOO_MANY_FAILED_LOGIN_ATTEMPTS",
            lockedUntil: calculateLockUntil(failedCount),
          },
        });

        return ErrorResponse({
          message: "Account locked due to multiple failed attempts.",
          status: 403,
        });
      }

      return ErrorResponse({
        message: "Invalid credentials",
        status: 401,
      });
    }

    // Run cleanup and token generation in parallel to reduce latency
    const [accessToken, refreshToken] = await Promise.all([
      JWT.signAccessToken({ userId: auth.userId }),
      JWT.signRefreshToken({ userId: auth.userId }),

      // Clear failed attempts for this email
      AttempServices.deleteMany({
        where: { email: body.email, type: "LOGIN" },
      }),
    ]);
    const hashToken = await JWT.hash(refreshToken);
    // Store refresh token
    await TokenServices.createToken({
      userId: auth.userId,
      hash: hashToken, // Hash token this should not be save as a plain text
      authId: auth.id,
    });

    return SuccessResponse({
      message: "Successfully logged in",
      data: sanitize(RefreshTokenResponseSchema, { accessToken, refreshToken }),
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});

export const POST = withTimeout(loginHandler);
