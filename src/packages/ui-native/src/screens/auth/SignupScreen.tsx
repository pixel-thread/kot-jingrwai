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

type SignupValues = {
    name: string;
    email: string;
    password: string;
};

type Props = {
    onSignup: (value: SignupValues) => void;
    onLoginPress: () => void;
    isLoading?: boolean;
};

export function SignupScreen({ onSignup, onLoginPress, isLoading }: Props) {
    const { colorScheme } = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handleSignup = async () => {
        // Basic validation could go here
        onSignup({ name, email, password });
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
                            <View className="flex-row items-center rounded-2xl bg-white px-4 py-3.5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
                                <MaterialCommunityIcons
                                    name="account-outline"
                                    size={22}
                                    color={isDarkMode ? gray[400] : gray[500]}
                                />
                                <TextInput
                                    className="ml-3 flex-1 text-base text-gray-900 dark:text-white"
                                    placeholder="Enter your full name"
                                    placeholderTextColor={isDarkMode ? gray[500] : gray[400]}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
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
                            <View className="flex-row items-center rounded-2xl bg-white px-4 py-3.5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
                                <MaterialCommunityIcons
                                    name="email-outline"
                                    size={22}
                                    color={isDarkMode ? gray[400] : gray[500]}
                                />
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
                        <Reanimated.View entering={FadeInDown.delay(300).duration(600).springify()}>
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
                                    placeholder="Create a password"
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

                        {/* Confirm Password Input */}
                        <Reanimated.View entering={FadeInDown.delay(400).duration(600).springify()}>
                            <Text
                                variant="secondary"
                                size="xs"
                                weight="bold"
                                className="mb-2 ml-1 uppercase tracking-wider text-gray-500">
                                Confirm Password
                            </Text>
                            <View className="flex-row items-center rounded-2xl bg-white px-4 py-3.5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
                                <TextInput
                                    className="ml-3 flex-1 text-base text-gray-900 dark:text-white"
                                    placeholder="Confirm your password"
                                    placeholderTextColor={isDarkMode ? gray[500] : gray[400]}
                                    secureTextEntry={!isConfirmPasswordVisible}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
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
                        </Reanimated.View>

                        {/* Signup Button */}
                        <Reanimated.View entering={FadeInDown.delay(500).duration(600).springify()}>
                            <Button
                                title="Create Account"
                                onPress={handleSignup}
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

                    {/* Social Login (Mock) */}
                    <Reanimated.View
                        entering={FadeInUp.delay(800).duration(600).springify()}
                        className="flex-row justify-center space-x-6">
                        {[
                            { name: "google", icon: "google" },
                            { name: "apple", icon: "apple" },
                            { name: "facebook", icon: "facebook" },
                        ].map((social) => (
                            <TouchableOpacity
                                key={social.name}
                                className="h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700"
                            >
                                <MaterialCommunityIcons
                                    name={social.icon as any}
                                    size={24}
                                    color={isDarkMode ? "white" : "#1f2937"}
                                />
                            </TouchableOpacity>
                        ))}
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
