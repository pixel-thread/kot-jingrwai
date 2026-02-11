import { SignupScreen } from "@repo/ui-native";
import { http, SignUpSchema } from "@repo/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { z } from "zod";
import { Platform, ToastAndroid } from "react-native";
import { AUTH_ENDPOINT } from "@repo/constants";

type FormValue = z.infer<typeof SignUpSchema>;

export const Signup = () => {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormValue) => http.post(AUTH_ENDPOINT.POST_REGISTER, data),
    onSuccess: async (data) => {
      if (data.success) router.replace("/auth");
      if (Platform.OS === "android") {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
      return data.data;
    },
  });

  const onSignup = (data: FormValue) => mutate(data);

  return (
    <SignupScreen onSignup={onSignup} isLoading={isPending} onLoginPress={() => router.back()} />
  );
};
