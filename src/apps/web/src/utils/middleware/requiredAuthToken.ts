import { verifyToken } from "@clerk/backend";
import { NextRequest } from "next/server";
import { env } from "@/env";
import { UnauthorizedError } from "../errors/unAuthError";
import { getUserById } from "@/services/user/getUserById";
import { createUser } from "@/services/user/createUser";
import { clientClerk } from "@/lib/clerk/client";
import { getUserByEmail } from "@/services/user/getUserByEmail";

export async function requiredAuthToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Unauthorized");
  }

  const claims = await verifyToken(token, {
    secretKey: env.CLERK_SECRET_KEY, // never expose in client code
  });

  if (!claims?.sub) {
    throw new UnauthorizedError("Unauthorized");
  }

  let user = await getUserById({ id: claims.sub });

  if (!user) {
    const clerkUser = await clientClerk.users.getUser(claims.sub);

    const emailUser = await getUserByEmail({
      email: clerkUser.primaryEmailAddress?.emailAddress || "",
    });

    if (emailUser) {
      user = emailUser;
    } else {
      user = await createUser({
        data: {
          name: clerkUser.firstName ?? "",
          email: clerkUser?.primaryEmailAddress?.emailAddress || "",
          clerkId: claims.sub,
          hasImage: clerkUser.hasImage,
          imageUrl: clerkUser.imageUrl,
        },
      });
    }
  }
  return user;
}
