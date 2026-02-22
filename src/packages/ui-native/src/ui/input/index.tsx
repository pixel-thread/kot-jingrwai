import React from "react";
import { View, Text, TextInput } from "react-native";
import clsx from "clsx";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <View className="mb-4 space-y-1">
      {label && (
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</Text>
      )}
      <TextInput
        className={clsx(
          "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-base text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white",
          error && "border-red-500 bg-red-50 dark:border-red-900 dark:bg-red-900/10",
          className
        )}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && <Text className="text-xs text-red-500">{error}</Text>}
    </View>
  );
};
