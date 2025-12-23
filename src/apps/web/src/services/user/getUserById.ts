import { prisma } from "@/lib/database/prisma";

type Props = {
  id: string;
};
export async function getUserById({ id }: Props) {
  return await prisma.user.findUnique({ where: { clerkId: id } });
}
