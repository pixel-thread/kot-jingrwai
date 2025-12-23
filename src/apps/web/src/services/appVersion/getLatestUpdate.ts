import { prisma } from "@/lib/database/prisma";

export async function getLatestUpdate() {
  return prisma.appVersion.findFirst({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" }, // desc newest first
    take: 1,
  });
}
