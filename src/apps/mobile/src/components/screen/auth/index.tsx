import { LoginScreen as LScreen } from "@repo/ui-native";
import { useRouter } from "expo-router";

export const LoginScreen = () => {
  const router = useRouter();
  const isLoading = false;

  const onLogin = () => {};

  return (
    <LScreen
      onLogin={onLogin}
      isLoading={isLoading}
      onSignup={() => router.push("/auth/sign-up")}
    />
  );
};
