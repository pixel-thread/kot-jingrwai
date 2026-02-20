"use client";
import { TQueryProvider } from "./query";
import { Toaster } from "../ui/sonner";
import { NxThemeProvider } from "./theme";

type MainProviderProps = {
  children: React.ReactNode;
};

export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <TQueryProvider>
      <NxThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster />
      </NxThemeProvider>
    </TQueryProvider>
  );
};
