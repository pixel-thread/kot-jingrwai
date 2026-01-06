import { View, Text } from "react-native";

export const BetaBatch = () => {
  return (
    <View className="absolute right-0 top-0 z-50 flex w-[100] translate-x-8 translate-y-8 rotate-90 transform items-center justify-end rounded-r-lg bg-red-500 px-4 py-2 shadow-md">
      <Text className="w-full text-right text-xl font-extrabold uppercase text-yellow-300">
        Beta
      </Text>
    </View>
  );
};
