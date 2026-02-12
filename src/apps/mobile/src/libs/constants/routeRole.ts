import { RoleT } from "@repo/types";

type RoleRoute = {
  url: string;
  role: RoleT[]; // Use RoleT from shared types
  redirect?: string;
  needAuth?: boolean;
};

export const defaultRoute: RoleRoute[] = [
  {
    role: ["SUPER_ADMIN", "ADMIN"],
    url: "/admin/*",
    needAuth: true,
    redirect: "/forbidden",
  },
  {
    role: ["USER", "ADMIN", "SUPER_ADMIN"],
    url: "/*",
    needAuth: false,
    redirect: "/",
  },
];
