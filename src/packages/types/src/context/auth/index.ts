export type RoleT = "ADMIN" | "USER" | "SUPER_ADMIN";

export interface UserT {
  id: string;
  name: string;
  email: string;
  role: RoleT;
}

export interface AuthContextI {
  user: UserT | null | undefined;
  role: RoleT;
  isAuthLoading: boolean;
  refresh: () => void;
}
