import { prisma } from "@/lib/database/prisma";

export async function getDownloadUsers({ page }: { page?: number } = {}) {
  return await prisma.downloadUsers.findMany();
}
