import { View, TouchableOpacity, Platform } from "react-native";

import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Reanimated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Text } from "../ui/typography";
import { SongT } from "@repo/types";
import { useColorScheme } from "nativewind";
import colors from "tailwindcss/colors";

export const SongListItem = ({ song }: { song: SongT }) => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Animation for press feedback
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 10 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Reanimated.View style={animatedStyle} className="mb-0">
      <TouchableOpacity
        onPress={() => {
          router.push(`/songs/${song.id}`);
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800"
        style={
          Platform.OS === "ios"
            ? {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }
            : {}
        }>
        <View className="flex-row items-center p-3">
          <View className="mr-3 h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
            <Text variant={"primary"} size="4xl" weight="bold">
              {song.metadata.number}
            </Text>
          </View>
          <View className="flex-1 border-l border-gray-100 pl-3 dark:border-gray-700">
            <Text size="lg" weight="semibold" className="line-clamp-1 capitalize">
              {song.title}
            </Text>
            {song.metadata.author && (
              <View className="mt-1 flex-row items-center">
                <MaterialCommunityIcons
                  name="account"
                  size={14}
                  color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                />
                <Text size="xs" variant="muted" className="ml-1">
                  {song.metadata.author || "Unknown"}
                </Text>
              </View>
            )}
            {song.metadata.composer && (
              <View className="mt-1 flex-row items-center">
                <MaterialCommunityIcons
                  name="music"
                  size={14}
                  color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                />
                <Text size="xs" variant="muted" className="ml-1">
                  {song.metadata.composer}
                </Text>
              </View>
            )}
          </View>
          <MaterialCommunityIcons
            className="text-indigo-600 dark:text-indigo-400"
            color={isDarkMode ? colors.indigo[400] : colors.indigo[600]}
            name="chevron-right"
            size={24}
          />
        </View>
      </TouchableOpacity>
    </Reanimated.View>
  );
};
