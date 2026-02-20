"use client";
import { AuthContext } from "@/lib/context/auth";
import { AuthContextT } from "@/types/auth/context";
import React from "react";

type AuthProviderProps = {
  children: Readonly<Required<React.ReactNode>>;
};

type UserT = Required<{ id: string; role: string }>;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const value: AuthContextT = {
    user: null,
    isAuthLoading: false,
    isSuperAdmin: false,
    refresh: () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
