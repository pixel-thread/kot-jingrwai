import { ToastAndroid, TouchableOpacity, View } from "react-native";
import { Text } from "../typography";
import * as Clipboard from "expo-clipboard";
import { Skeleton } from "../skeleton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import Reanimated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { http } from "@repo/utils";
import { BibleVerseT as VerseT } from "@repo/types";
import { useEffect, useState } from "react";

async function getBibleVerse() {
  return await http.get<VerseT>("/verse");
}

export const QuoteOfTheDay = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [data, setData] = useState<VerseT | null>(null);

  const copyToClipboard = async () => {
    if (data?.verse?.details.text) {
      await Clipboard.setStringAsync(data.verse.details.text);
      ToastAndroid.show("Quote copied to clipboard!", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getBibleVerse().then((res) => setData(res.data));

    return () => {
      setData(null);
    };
  }, []);

  if (!data) {
    return (
      <Reanimated.View
        entering={FadeIn.duration(500)}
        className="overflow-hidden rounded-xl border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
      >
        <Skeleton className="mb-2 h-5 w-1/2 self-center" />
        <Skeleton className="mb-3 h-6 w-4/5 self-center" />
        <Skeleton className="h-4 w-1/3 self-end" />
      </Reanimated.View>
    );
  }

  return (
    <Reanimated.View entering={FadeInDown.duration(500)}>
      <TouchableOpacity
        onPress={copyToClipboard}
        className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm dark:border-none dark:border-gray-950 dark:bg-gray-800"
      >
        <View className="p-4">
          <View className="mb-2 flex-row items-center justify-center">
            <MaterialCommunityIcons
              name="format-quote-open"
              size={20}
              color={isDarkMode ? "#93c5fd" : "#3b82f6"}
              style={{ marginRight: 4 }}
            />
            <Text
              size="md"
              weight="semibold"
              align="center"
              className="capitalize text-gray-800 dark:text-gray-200"
            >
              Dkhot Bible
            </Text>
            <MaterialCommunityIcons
              name="format-quote-close"
              size={20}
              color={isDarkMode ? "#93c5fd" : "#3b82f6"}
              style={{ marginLeft: 4 }}
            />
          </View>

          <Reanimated.View entering={FadeIn.delay(300).duration(500)}>
            <Text
              size="lg"
              align="center"
              weight={"semibold"}
              leading={"loose"}
              italic
              className="mb-3 px-2 text-gray-700 dark:text-gray-300"
            >
              {data?.verse.details?.text?.trim()}
            </Text>

            <View className="flex-row items-center justify-end">
              <Text size="md" className="text-gray-600 dark:text-gray-400">
                {data?.verse.details?.reference}
              </Text>
            </View>

            <View className="mt-3 flex-row items-center justify-end">
              <MaterialCommunityIcons
                name="content-copy"
                size={14}
                color={isDarkMode ? "#93c5fd" : "#3b82f6"}
                style={{ marginRight: 4 }}
              />
              <Text size="xs" className="text-blue-600 dark:text-blue-400">
                Tap to copy
              </Text>
            </View>
          </Reanimated.View>
        </View>
      </TouchableOpacity>
    </Reanimated.View>
  );
};
