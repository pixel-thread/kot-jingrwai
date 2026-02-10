import { cookies } from "next/headers";

export async function setAuthCookies(access: string, refresh: string) {
  const store = await cookies();

  store.set("access", access, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 900,
  });

  store.set("refresh", refresh, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/api/auth/refresh",
    maxAge: 604800,
  });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete("access");
  store.delete("refresh");
}
