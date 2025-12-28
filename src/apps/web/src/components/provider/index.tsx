"use client";
import { AuthProvider } from "./auth";
import { TQueryProvider } from "./query";
import { RoleBaseRoute } from "../protectedRoute/protectedRoute";
import { Toaster } from "../ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { env } from "@/env";
import { NxThemeProvider } from "./theme";

type MainProviderProps = {
  children: React.ReactNode;
};
export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <TQueryProvider>
        <NxThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <RoleBaseRoute>{children}</RoleBaseRoute>
            <Toaster />
          </AuthProvider>
        </NxThemeProvider>
      </TQueryProvider>
    </ClerkProvider>
  );
};
