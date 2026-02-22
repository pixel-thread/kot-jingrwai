import React, { useCallback, useEffect } from "react";
import { AuthContext, TokenStoreManager } from "@repo/libs";
import { UserT, AuthContextI } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { http } from "@repo/utils";
import { AUTH_ENDPOINT } from "@repo/constants";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isTokenSet, setIsTokenSet] = React.useState(false);

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => http.get<UserT>(AUTH_ENDPOINT.GET_ME),
    select: (data) => data?.data,
    enabled: isTokenSet,
  });

  const getToken = useCallback(async () => {
    if (isTokenSet) return;
    const token = await TokenStoreManager.isTokenSet();
    if (token) {
      setIsTokenSet(token);
    }
  }, [isTokenSet]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  const value = {
    user: data,
    role: data?.role || "USER",
    refresh: refetch,
    isAuthLoading: isFetching,
  } satisfies AuthContextI;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
