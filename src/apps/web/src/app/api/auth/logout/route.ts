import { TokenServices } from "@src/services/tokens";
import { handleApiErrors } from "@src/utils/errors/handleApiErrors";
import { UnauthorizedError } from "@src/utils/errors/unAuthError";
import { SuccessResponse } from "@src/utils/next-response";
import { withValidation } from "@src/utils/middleware/withValidiation";
import { TokenSchema } from "@src/utils/validation/token";

export const POST = withValidation({ body: TokenSchema }, async ({ body }) => {
  try {
    const { refreshToken } = body;

    if (!refreshToken) throw new UnauthorizedError("Unauthorized");

    const tokenExists = await TokenServices.getUnique({
      where: {
        hash: refreshToken,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!tokenExists) throw new UnauthorizedError("Unauthorized");

    // Revoke token
    await TokenServices.updateUnique({
      where: { hash: refreshToken },
      data: { isRevoked: true },
    });

    return SuccessResponse({ message: "Logout successful" });
  } catch (error) {
    return handleApiErrors(error);
  }
});
