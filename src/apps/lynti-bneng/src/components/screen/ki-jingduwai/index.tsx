import { Container, Text } from "@repo/ui-native";
import { ScrollView , View, TouchableOpacity, Platform } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { kiJingDuwai } from "@/src/libs/constants/ki-jing-duwai";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Reanimated from "react-native-reanimated";
import colors from "tailwindcss/colors";
import { useRouter } from "expo-router";
import { useThemeStore } from "@repo/libs";
import { truncateText } from "@repo/utils";

export const KiJingUDwaiScreen = () => {
  const router = useRouter();
  const { theme } = useThemeStore();
  const isDarkMode = theme === "dark";
  return (
    <Container>
      <ScrollView className="flex-1 flex-col p-4">
        <FlashList
          data={kiJingDuwai}
          renderItem={({ item: song }) => (
            <Reanimated.View className="my-1">
              <TouchableOpacity
                onPress={() => {
                  router.push(`/ki-jingduwai/${song.id}`);
                }}
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
                  <View className="flex-1  py-3">
                    <Text size="lg" weight="semibold" className="line-clamp-1">
                      {truncateText({ text: song.title, maxLength: 40 })}
                    </Text>
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
          )}
          estimatedItemSize={10}
        />
      </ScrollView>
    </Container>
  );
};
