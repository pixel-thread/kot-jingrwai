import { handleApiErrors } from "@src/utils/errors/handleApiErrors";
import { UnauthorizedError } from "@src/utils/errors/unAuthError";
import { TokenServices } from "@src/services/tokens";
import { JWT } from "@libs/auth/jwt";
import { ErrorResponse, SuccessResponse } from "@src/utils/next-response";
import { logger, RefreshTokenResponseSchema, TokenSchema } from "@repo/utils";
import { withValidation } from "@src/utils/middleware/withValidiation";
import { sanitize } from "@/utils/helper/sanitize";
import { AccountLockServices } from "@/services/auth/lock";

export const POST = withValidation({ body: TokenSchema }, async ({ body }) => {
  try {
    const { refreshToken: token } = body;
    const refreshToken = await JWT.hash(token);

    // Ensure client provided a refresh token
    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token required");
    }

    // Detect reuse of an old revoked token
    const isTokenRevoked = await TokenServices.getUnique({
      where: { hash: refreshToken, isRevoked: true },
    });

    if (isTokenRevoked) {
      // If old token is being used, revoke **all tokens** for this user
      // This prevents attackers from using leaked refresh tokens
      await TokenServices.updateMany({
        where: { userId: isTokenRevoked.userId },
        data: { isRevoked: true },
      });

      throw new UnauthorizedError("Unauthorized");
    }

    // Validate the refresh token
    const tokenRecord = await TokenServices.getUnique({
      where: {
        hash: refreshToken,
        isRevoked: false, // must not be revoked
        expiresAt: { gt: new Date() }, // must not be expired
      },
    });

    if (!tokenRecord) {
      throw new UnauthorizedError("Unauthorized");
    }

    const userId = tokenRecord.userId;
    const authId = tokenRecord.authId;

    // Optional account lock check
    // If account was locked after login, prevent refresh
    const now = new Date();
    const lockedAccount = await AccountLockServices.findFirst({
      where: { authId, lockedUntil: { gte: now } },
    });

    if (lockedAccount) {
      // Generic message to avoid leaking exact lock duration
      return ErrorResponse({
        message: "Account temporarily locked. Please try again later.",
        status: 403,
      });
    }

    // Issue new refresh token
    const newRefreshToken = await JWT.signRefreshToken({ userId });

    // Revoke all old refresh token
    await TokenServices.updateMany({
      where: { userId: userId },
      data: { isRevoked: true },
    });

    // Issue new access token
    const newAccessToken = await JWT.signAccessToken({ userId });

    const newHashedToken = await JWT.hash(newRefreshToken);

    // add new unrevoked refresh token
    await TokenServices.createToken({
      userId,
      hash: newHashedToken,
      authId,
    });

    // Send back sanitized response
    const data = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };

    return SuccessResponse({
      data: sanitize(RefreshTokenResponseSchema, data),
      message: "Successfully refresh",
    });
  } catch (error) {
    logger.error;
    return handleApiErrors(error);
  }
});
