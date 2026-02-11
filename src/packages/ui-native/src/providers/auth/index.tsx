import React from "react";
import { AuthContext } from "@repo/libs";
import { UserT, AuthContextI } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { http } from "@repo/utils";
import { AUTH_ENDPOINT } from "@repo/constants";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const { isFetching, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => http.get<UserT>(AUTH_ENDPOINT.GET_ME),
    select: (data) => data.data,
  });

  const value = {
    user: data,
    role: "USER",
    refresh: refetch,
    isAuthLoading: isFetching,
  } satisfies AuthContextI;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
