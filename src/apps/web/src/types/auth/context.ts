import { Prisma } from "@/lib/database/prisma/generated/prisma";

export type AuthContextT = {
   
  user: any | null | Prisma.UserCreateInput;
  isSuperAdmin: boolean;
  isAuthLoading: boolean;
  refresh: () => void;
};
