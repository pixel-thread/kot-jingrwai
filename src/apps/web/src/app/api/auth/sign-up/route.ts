import { AuthServices } from "@services/auth";
import { withValidation } from "@src/utils/middleware/withValidiation";
import { handleApiErrors } from "@utils/errors/handleApiErrors";
import { ErrorResponse, SuccessResponse } from "@utils/next-response";
import { SignUpSchema } from "@utils/validation/auth";

export const POST = withValidation({ body: SignUpSchema }, async ({ body }) => {
  try {
    const email = body.email;
    // check if user already exists under the same email address
    if (body.password !== body.confirmPassword)
      return ErrorResponse({ message: "Passwords do not match", status: 400 });

    const user = await AuthServices.getUnique({ where: { email } });

    if (user) return ErrorResponse({ message: "User already exists", status: 400 });

    const newUser = await AuthServices.create({
      email: body.email,
      name: body.name,
      password: body.password,
    });

    return SuccessResponse({
      data: newUser,
      message: "User created successfully. Please login",
      status: 201,
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
