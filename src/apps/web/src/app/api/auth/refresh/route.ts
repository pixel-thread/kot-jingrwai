import { handleApiErrors } from "@src/utils/errors/handleApiErrors";
import { UnauthorizedError } from "@src/utils/errors/unAuthError";
import { TokenServices } from "@src/services/tokens";
import { JWT } from "@libs/auth/jwt";
import { SuccessResponse } from "@src/utils/next-response";
import { RefreshTokenResponseSchema, TokenSchema } from "@repo/utils";
import { withValidation } from "@src/utils/middleware/withValidiation";
import { sanitize } from "@/utils/helper/sanitize";

export const POST = withValidation({ body: TokenSchema }, async ({ body }) => {
  try {
    const { refreshToken } = body;

    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token required");
    }

    // check if someone is using the old refresh token
    const isTokenRevoked = await TokenServices.getUnique({
      where: { hash: refreshToken, isRevoked: true },
    });

    if (isTokenRevoked) {
      // revoke all tokens seem like user is using the old refresh token
      await TokenServices.updateMany({
        where: { userId: isTokenRevoked.userId },
        data: { isRevoked: true },
      });

      throw new UnauthorizedError("Unauthorized");
    }

    const tokenRecord = await TokenServices.getUnique({
      where: {
        hash: refreshToken,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!tokenRecord) {
      throw new UnauthorizedError("Unauthorized");
    }

    const userId = tokenRecord.userId;

    const authId = tokenRecord.authId;

    const newRefreshToken = await JWT.signRefreshToken({ userId });

    await TokenServices.createToken({
      userId: userId,
      hash: newRefreshToken,
      authId: authId,
    });

    const newAccessToken = await JWT.signAccessToken({ userId });

    const data = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };

    return SuccessResponse({
      data: sanitize(RefreshTokenResponseSchema, data),
      message: "Successfully refresh",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
