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
import { Text } from "../../ui/typography";
import { Button } from "../../ui/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { gray } from "tailwindcss/colors";
import Reanimated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { z } from "zod";
import { SignUpSchema } from "@repo/utils";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type SignupValues = z.infer<typeof SignUpSchema>;

type Props = {
  onSignup: (value: SignupValues) => void;
  onLoginPress: () => void;
  isLoading?: boolean;
};

export function SignupScreen({ onSignup, onLoginPress, isLoading }: Props) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(SignUpSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<SignupValues> = (data) => {
    onSignup(data);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
          className="px-6 pb-10 pt-4">
          {/* Header Section */}
          <Reanimated.View
            entering={FadeInDown.duration(600).springify()}
            className="mb-8 items-center">
            <Text variant="primary" size="3xl" weight="bold" className="text-center">
              Create Account
            </Text>
            <Text variant="secondary" className="mt-2 text-center text-gray-500">
              Join the rhythm of Kot Jingrwai
            </Text>
          </Reanimated.View>

          <View className="gap-y-4">
            {/* Name Input */}
            <Reanimated.View entering={FadeInDown.delay(100).duration(600).springify()}>
              <Text
                variant="secondary"
                size="xs"
                weight="bold"
                className="mb-2 ml-1 uppercase tracking-wider text-gray-500">
                Full Name
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center rounded-2xl bg-white px-4 py-3.5 shadow-sm ring-1 dark:bg-gray-800 ${errors.name ? "ring-red-500" : "ring-gray-100 dark:ring-gray-700"}`}>
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={22}
                      color={errors.name ? "#ef4444" : isDarkMode ? gray[400] : gray[500]}
                    />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                      placeholderTextColor={isDarkMode ? gray[500] : gray[400]}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  </View>
                )}
              />
              {errors.name && (
                <Text className="ml-1 mt-1 text-xs text-red-500">{errors.name.message}</Text>
              )}
            </Reanimated.View>

            {/* Email Input */}
            <Reanimated.View entering={FadeInDown.delay(200).duration(600).springify()}>
              <Text
                variant="secondary"
                size="xs"
                weight="bold"
                className="mb-2 ml-1 uppercase tracking-wider text-gray-500">
                Email Address
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center rounded-2xl bg-white px-4 py-3.5 shadow-sm ring-1 dark:bg-gray-800 ${errors.email ? "ring-red-500" : "ring-gray-100 dark:ring-gray-700"}`}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={22}
                      color={errors.email ? "#ef4444" : isDarkMode ? gray[400] : gray[500]}
                    />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900 dark:text-white"
                      placeholder="name@example.com"
                      placeholderTextColor={isDarkMode ? gray[500] : gray[400]}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text className="ml-1 mt-1 text-xs text-red-500">{errors.email.message}</Text>
              )}
            </Reanimated.View>

            {/* Password Input */}
            <Reanimated.View entering={FadeInDown.delay(300).duration(600).springify()}>
              <Text
                variant="secondary"
                size="xs"
                weight="bold"
                className="mb-2 ml-1 uppercase tracking-wider text-gray-500">
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center rounded-2xl bg-white px-4 py-3.5 shadow-sm ring-1 dark:bg-gray-800 ${errors.password ? "ring-red-500" : "ring-gray-100 dark:ring-gray-700"}`}>
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900 dark:text-white"
                      placeholder="Create a password"
                      placeholderTextColor={isDarkMode ? gray[500] : gray[400]}
                      secureTextEntry={!isPasswordVisible}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
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
                )}
              />
              {errors.password && (
                <Text className="ml-1 mt-1 text-xs text-red-500">{errors.password.message}</Text>
              )}
            </Reanimated.View>

            {/* Confirm Password Input */}
            <Reanimated.View entering={FadeInDown.delay(400).duration(600).springify()}>
              <Text
                variant="secondary"
                size="xs"
                weight="bold"
                className="mb-2 ml-1 uppercase tracking-wider text-gray-500">
                Confirm Password
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center rounded-2xl bg-white px-4 py-3.5 shadow-sm ring-1 dark:bg-gray-800 ${errors.confirmPassword ? "ring-red-500" : "ring-gray-100 dark:ring-gray-700"}`}>
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900 dark:text-white"
                      placeholder="Confirm your password"
                      placeholderTextColor={isDarkMode ? gray[500] : gray[400]}
                      secureTextEntry={!isConfirmPasswordVisible}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                    <TouchableOpacity
                      onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <MaterialCommunityIcons
                        name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color={isDarkMode ? gray[400] : gray[500]}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.confirmPassword && (
                <Text className="ml-1 mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </Reanimated.View>

            {/* Signup Button */}
            <Reanimated.View entering={FadeInDown.delay(500).duration(600).springify()}>
              <Button
                title="Create Account"
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}
                size="lg"
                className="mt-2 rounded-2xl shadow-md shadow-indigo-200 dark:shadow-none"
              />
            </Reanimated.View>
          </View>

          {/* Divider */}
          <Reanimated.View
            entering={FadeInUp.delay(700).duration(600).springify()}
            className="my-8 flex-row items-center justify-center space-x-4">
            <View className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800" />
            <Text variant="secondary" size="sm" className="text-gray-400">
              Or sign up with
            </Text>
            <View className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800" />
          </Reanimated.View>

          {/* Login Link */}
          <Reanimated.View
            entering={FadeInUp.delay(900).duration(600).springify()}
            className="mt-8 flex-row justify-center pb-4">
            <Text variant="secondary" size="sm">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={onLoginPress}>
              <Text
                variant="primary"
                size="sm"
                weight="bold"
                className="ml-1 text-indigo-600 dark:text-indigo-400">
                Sign In
              </Text>
            </TouchableOpacity>
          </Reanimated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
