import { AUTH_ENDPOINT } from "@repo/constants";
import { LoginScreen as LScreen } from "@repo/ui-native";
import { http } from "@repo/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Platform, ToastAndroid } from "react-native";

type FormValue = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormValue) => http.post(AUTH_ENDPOINT.POST_LOGIN, data),
    onSuccess: (data) => {
      if (data.success) {
        if (Platform.OS === "android") {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          return;
        }
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        return;
      }
    },
  });

  const onLogin = (data: FormValue) => mutate(data);

  return (
    <LScreen
      onLogin={onLogin}
      isLoading={isPending}
      onSignup={() => router.push("/auth/sign-up")}
    />
  );
};
