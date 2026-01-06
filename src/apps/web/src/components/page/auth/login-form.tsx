"use client";
import { SignIn } from "@clerk/nextjs";

export const LoginForm = () => {
  return (
    <div className={"flex h-screen w-full items-center justify-center"}>
      <SignIn />
    </div>
  );
};
