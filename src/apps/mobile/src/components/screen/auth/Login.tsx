import { LoginScreen } from "@repo/ui-native";

export default function page() {
  const OnLogin = () => {};
  return <LoginScreen onLogin={OnLogin} isLoading />;
}
