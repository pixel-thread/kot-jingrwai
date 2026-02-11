import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Container } from "../../common";
import { Text } from "../../typography";
import { Button } from "../../button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { gray } from "tailwindcss/colors";
import Reanimated, { FadeInDown, FadeInUp } from "react-native-reanimated";

type LoginValues = {
  email: string;
  password: string;
};

type Props = {
  onLogin: (value: LoginValues) => void;
  isLoading?: boolean;
};

export function LoginScreen({ onLogin, isLoading }: Props) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => onLogin({ email, password });

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
          className="gap-5 px-6 pb-10 pt-4">
          {/* Header Section */}
          <Reanimated.View
            entering={FadeInDown.duration(600).springify()}
            className="mb-10 items-center">
            <Text variant="primary" size="3xl" weight="bold" className="text-center">
              Welcome Back
            </Text>
            <Text variant="secondary" className="mt-2 text-center text-gray-500">
              Sign in to continue your musical journey
            </Text>
          </Reanimated.View>

          <View className="gap-y-5">
            {/* Email Input */}
            <Reanimated.View entering={FadeInDown.delay(100).duration(600).springify()}>
              <Text
                variant="secondary"
                size="xs"
                weight="bold"
                className="mb-2 ml-1 uppercase tracking-wider text-gray-500">
                Email Address
              </Text>
              <View className="flex-row items-center rounded-2xl bg-white px-4 py-3.5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
                <TextInput
                  className="ml-3 flex-1 text-base text-gray-900 dark:text-white"
                  placeholder="name@example.com"
                  placeholderTextColor={isDarkMode ? gray[500] : gray[400]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </Reanimated.View>

            {/* Password Input */}
            <Reanimated.View entering={FadeInDown.delay(200).duration(600).springify()}>
              <Text
                variant="secondary"
                size="xs"
                weight="bold"
                className="mb-2 ml-1 uppercase tracking-wider text-gray-500">
                Password
              </Text>
              <View className="flex-row items-center rounded-2xl bg-white px-4 py-3.5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
                <TextInput
                  className="ml-3 flex-1 text-base text-gray-900 dark:text-white"
                  placeholder="Enter your password"
                  placeholderTextColor={isDarkMode ? gray[500] : gray[400]}
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <MaterialCommunityIcons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color={isDarkMode ? gray[400] : gray[500]}
                  />
                </TouchableOpacity>
              </View>
            </Reanimated.View>

            {/* Login Button */}
            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              size="lg"
              className="rounded-2xl shadow-md shadow-indigo-200 dark:shadow-none"
            />
          </View>

          {/* Divider */}
          <View className="mt-4 gap-y-5">
            <Reanimated.View
              entering={FadeInUp.delay(600).duration(600).springify()}
              className="flex-row items-center justify-center space-x-4">
              <View className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800" />
              <Text variant="secondary" size="sm" className="text-gray-400">
                Or continue with
              </Text>
              <View className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800" />
            </Reanimated.View>

            <Reanimated.View
              entering={FadeInUp.delay(800).duration(600).springify()}
              className="flex-row justify-center">
              <Text variant="secondary" size="sm">
                Don&apos;t have an account?
              </Text>
              <TouchableOpacity>
                <Text
                  variant="primary"
                  size="sm"
                  weight="bold"
                  className="text-indigo-600 dark:text-indigo-400">
                  Create Account
                </Text>
              </TouchableOpacity>
            </Reanimated.View>
          </View>

          {/* Sign Up Link */}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
