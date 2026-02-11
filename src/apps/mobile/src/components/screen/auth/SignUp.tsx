import { SignupScreen } from "@repo/ui-native";
import { http } from "@repo/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const Signup = () => {
  const router = useRouter();

  const onSignup = () => {};
  const isLoading = false;
  return (
    <SignupScreen onSignup={onSignup} isLoading={isLoading} onLoginPress={() => router.back()} />
  );
};
