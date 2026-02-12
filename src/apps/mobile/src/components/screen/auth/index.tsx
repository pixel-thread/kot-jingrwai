import { AUTH_ENDPOINT } from "@repo/constants";
import { LoginScreen as LScreen } from "@repo/ui-native";
import { http } from "@repo/utils-native";
import { TokenStoreManager, useOnboardingStore } from "@repo/libs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Platform, ToastAndroid } from "react-native";
import { useAuth } from "@repo/hooks";

type FormValue = {
  email: string;
  password: string;
};

type ResType = {
  refreshToken: string;
  accessToken: string;
};

export const LoginScreen = () => {
  const router = useRouter();
  const auth = useAuth();
  const { setHasCompletedOnboarding } = useOnboardingStore();

  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormValue) => http.post<ResType>(AUTH_ENDPOINT.POST_LOGIN, data),
    onSuccess: async (data) => {
      if (data.success) {
        const res = data?.data;
        if (res?.refreshToken && res?.accessToken) {
          await TokenStoreManager.setTokens(res?.accessToken, res?.refreshToken);
          auth?.refresh();
        }
        if (Platform.OS === "android") {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
        }
        setHasCompletedOnboarding(true);
        router.replace("/");
        return res;
      }
      if (Platform.OS === "android") {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
      return data.data;
    },
  });

  const onLogin = (data: FormValue) => mutate(data);

  return (
    <LScreen
      onLogin={onLogin}
      isLoading={isPending}
      onSignup={() => router.replace("/auth/sign-up")}
    />
  );
};
