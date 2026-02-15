import { prisma } from "@/lib/database/prisma";

type Props = {
  email: string;
};

export async function getUserByEmail({ email }: Props) {
  return await prisma.auth.findUnique({ where: { email } });
}
