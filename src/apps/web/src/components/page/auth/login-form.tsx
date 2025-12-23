"use client";
import { SignIn } from "@clerk/nextjs";

export const LoginForm = () => {
  return (
    <div className={"flex h-screen items-center justify-center w-full"}>
      <SignIn />
    </div>
  );
};
