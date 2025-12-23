import { Prisma } from "@/lib/database/prisma/generated/prisma";

export type AuthContextT = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null | Prisma.UserCreateInput;
  isSuperAdmin: boolean;
  isAuthLoading: boolean;
  refresh: () => void;
};
