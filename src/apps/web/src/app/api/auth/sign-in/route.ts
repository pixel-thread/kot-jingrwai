import { handleApiErrors } from "@utils/errors/handleApiErrors";
import { ErrorResponse, SuccessResponse } from "@utils/next-response";
import { LoginSchema } from "@utils/validation/auth";
import { AuthServices } from "@services/auth";
import { BcryptService } from "@src/lib/auth/bcrypt";
import { TokenServices } from "@src/services/tokens";
import { JWT } from "@libs/auth/jwt";
import { withValidation } from "@src/utils/middleware/withValidiation";

const checkIfDateIsThreeMonth = (date: Date) => {
  return Date.now() - date.getTime() > 3 * 30 * 24 * 60 * 60 * 1000; // 3 months
};

export const POST = withValidation({ body: LoginSchema }, async ({ body }) => {
  try {
    const auth = await AuthServices.getUnique({
      where: { email: body.email },
    });

    const isInvalidCredentail =
      !auth || !(await BcryptService.compare(body.password, auth.hashPassword));

    if (isInvalidCredentail) {
      return ErrorResponse({ message: "Invalid credentials", status: 401 });
    }

    const accessToken = await JWT.signAccessToken({ userId: auth.userId });

    const hashedRefresh = await JWT.signRefreshToken({
      userId: auth?.userId,
    });

    // Store hashed refresh in DB
    await TokenServices.createToken({
      userId: auth.userId,
      hash: hashedRefresh,
      authId: auth.id,
    });

    const data = {
      refresh_token: hashedRefresh,
      accessToken: accessToken,
    };
    return SuccessResponse({
      data: data,
      message: "Successfully logged in",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
