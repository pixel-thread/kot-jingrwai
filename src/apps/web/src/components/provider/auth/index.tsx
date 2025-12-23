"use client";
import { AuthContext } from "@/lib/context/auth";
import { AUTH_ENDPOINT } from "@/lib/constants/endpoints/auth";
import { AuthContextT } from "@/types/auth/context";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axiosInstance from "@/utils/api";

type AuthProviderProps = {
  children: Readonly<Required<React.ReactNode>>;
};

type UserT = Required<{ id: string; role: string }>;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isSignedIn, getToken } = useAuth();
  const [isToken, setIsToken] = useState(false);
  const {
    isFetching: isLoadingMe,
    refetch,
    data: user,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => http.get<UserT>(AUTH_ENDPOINT.GET_ME),
    select: (data) => data.data,
    enabled: isToken,
  });

  // Get token from Clerk and set cookie
  const getClerkToken = useCallback(async () => {
    const token = await getToken({ template: "jwt" });
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
      setIsToken(true);
    }
  }, [getToken]);

  // Set token on sign-in
  useEffect(() => {
    if (isSignedIn) {
      getClerkToken();
    } else {
      axiosInstance.defaults.headers.common["Authorization"] = "";
      setIsToken(false);
    }
  }, [isSignedIn, getClerkToken]);

  const value: AuthContextT = {
    user,
    isAuthLoading: isLoadingMe,
    isSuperAdmin: user?.role === "SUPER_ADMIN" || false,
    refresh: () => refetch(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
