import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Props = {
  data: Prisma.UserCreateInput;
};

export async function createUser({ data }: Props) {
  return await prisma.user.create({ data });
}
