import { prisma } from "@/lib/database/prisma";

type Props = {
  id?: string;
  isAll?: boolean;
};

export async function deleteVerse({ id, isAll = false }: Props) {
  if (isAll) {
    return await prisma.bibleVerse.deleteMany();
  }
  return await prisma.bibleVerse.delete({ where: { id } });
}
