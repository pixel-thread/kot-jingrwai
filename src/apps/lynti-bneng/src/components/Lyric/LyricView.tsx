import { View, Platform, TouchableOpacity } from "react-native";
import { cn, useSongStore, useTextStore } from "@repo/libs";
import { SongT } from "@repo/types";
import { Text, Ternary } from "@repo/ui-native";
import { useEffect } from "react";
import { useColorScheme } from "nativewind";
import colors from "tailwindcss/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Reanimated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedRef,
} from "react-native-reanimated";
import { useKeepAwake } from "expo-keep-awake";
import { copyToClipboard } from "@repo/utils";
import { FloatingActionButtons } from "@repo/ui-native/common/FloatingAction";
import { MiniMusicPlayer } from "@components/Common/MiniMusicPlayer";

type LyricViewProps = {
  song: SongT;
};

export const LyricView = ({ song }: LyricViewProps) => {
  useKeepAwake();
  const scrollRef = useAnimatedRef<ScrollView>();
  const { size, isSelectable } = useTextStore();
  const { addRecentlyPlayedSong } = useSongStore();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const title = song.title;
  const paragraphs = song.paragraphs;
  const sortedParagraphs = [...paragraphs].sort((a, b) => a.order - b.order);

  const sectionCount: Record<string, number> = {};

  // Animation values
  const headerOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    addRecentlyPlayedSong(song);

    // Animate elements when component mounts
    headerOpacity.value = withTiming(1, { duration: 800 });
    contentOpacity.value = withTiming(1, { duration: 1000 });
  }, [addRecentlyPlayedSong, song, headerOpacity, contentOpacity]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [song.metadata.number, scrollRef]);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
    };
  });

  return (
    <>
      <FloatingActionButtons>
        <MiniMusicPlayer song={song} />
      </FloatingActionButtons>
      <ScrollView
        ref={scrollRef}
        simultaneousHandlers={scrollRef}
        contentContainerStyle={{ flexGrow: 1, paddingBlockEnd: 50 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>
        <View className="flex-1" collapsable={false}>
          <Reanimated.View
            style={headerAnimatedStyle}
            className="mb-6 w-full items-center justify-center rounded-b-3xl bg-gradient-to-r from-indigo-600 to-purple-600 pb-6 pt-6">
            <Text size={"2xl"} weight={"extrabold"} className="mb-1 text-center">
              {title}
            </Text>
            <View className="flex-row items-center justify-center space-x-2">
              {song.metadata.number && (
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="music-note"
                    size={16}
                    color={isDarkMode ? colors.gray[200] : colors.gray[950]}
                  />
                  <Text size={"sm"} className="ml-1 opacity-80">
                    #{song.metadata.number}
                  </Text>
                </View>
              )}
              {song.metadata.author && (
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="account"
                    size={16}
                    color={isDarkMode ? colors.gray[200] : colors.gray[950]}
                  />
                  <Text size={"sm"} className="ml-1 opacity-80">
                    {song.metadata.author}
                  </Text>
                </View>
              )}
            </View>
            {song.metadata.composer && (
              <Text size={"xs"} className="mt-1 text-center opacity-70">
                Composer: {song.metadata.composer}
              </Text>
            )}
            {song.metadata.syllables && (
              <View className="mt-2 rounded-full bg-gray-100/30 px-3 py-1 dark:bg-gray-800/30">
                <Text weight={"medium"} className="text-center">
                  {song.metadata.syllables}
                </Text>
              </View>
            )}
          </Reanimated.View>

          <Reanimated.View style={contentAnimatedStyle} className="px-4">
            {sortedParagraphs.map((paragraph, paragraphIndex) => {
              const type = capitalize(paragraph.type ?? "Verse");
              sectionCount[type] = (sectionCount[type] || 0) + 1;
              return (
                <Reanimated.View
                  key={paragraph.id}
                  entering={FadeInDown.delay(300 + paragraphIndex * 100).duration(800)}
                  className="mb-4">
                  <View className="mb-2 flex-row items-center">
                    <View className="mr-2 h-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 px-3">
                      <Text size={"sm"} weight={"bold"}>
                        {type} {sectionCount[type] > 1 ? sectionCount[type] : ""}
                      </Text>
                    </View>
                    <View className="h-px flex-1 bg-gray-800/20 dark:bg-gray-200/20" />
                  </View>
                  <View
                    className={cn(
                      getParagraphStyle(paragraph.type),
                      "overflow-hidden rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
                    )}
                    style={
                      Platform.OS === "ios"
                        ? {
                            shadowColor: isDarkMode ? colors.gray[900] : colors.black,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: isDarkMode ? 0.3 : 0.1,
                            shadowRadius: 3,
                          }
                        : {
                            shadowColor: isDarkMode ? colors.gray[900] : colors.black,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: isDarkMode ? 0.3 : 0.1,
                            shadowRadius: 3,
                          }
                    }>
                    {isSelectable && (
                      <TouchableOpacity
                        onPress={() => copyToClipboard(paragraph.lines.join("\n"))}
                        className="absolute right-3 z-50 mt-3 flex-row items-center justify-end">
                        <MaterialCommunityIcons
                          name="content-copy"
                          size={14}
                          color={isDarkMode ? "#93c5fd" : "#3b82f6"}
                          style={{ marginRight: 4 }}
                        />
                      </TouchableOpacity>
                    )}
                    {paragraph.lines.map((line, index) => {
                      const isFirst = index === 0;
                      const isLast = index === paragraph.lines.length - 1;
                      const isChorus = paragraph.type === "CHORUS";
                      const textContent = line;
                      return (
                        <Ternary
                          key={`${paragraph.id}-line-${index}`}
                          condition={isChorus}
                          ifTrue={
                            <View className="flex-1 flex-row">
                              {isFirst && (
                                <Text variant={"primary"} size={"xl"}>
                                  {"\""}
                                </Text>
                              )}
                              <View className={isFirst ? "flex-1 px-0" : isLast ? "pl-2" : "px-2"}>
                                <Text
                                  key={`${paragraph.id}-${isChorus ? "chorus" : "verse"}-line-${index}`}
                                  size={size}
                                  leading={"loose"}
                                  variant={"secondary"}
                                  weight={"normal"}
                                  italic
                                  tracking={"tighter"}
                                  align={"center"}
                                  className={cn("text-left")}>
                                  {textContent.text || "N/A"}
                                </Text>
                              </View>
                              {isLast && (
                                <Text variant={"primary"} weight={"bold"} size={"xl"}>
                                  {"\""}
                                </Text>
                              )}
                            </View>
                          }
                          ifFalse={
                            <>
                              <Text
                                key={`${paragraph.id}-line-${index}`}
                                size={size}
                                leading={"loose"}
                                weight={"bold"}
                                tracking={"tight"}
                                align={"center"}
                                className={cn("text-left text-gray-900 dark:text-gray-100")}>
                                {textContent.text || " "}
                              </Text>
                            </>
                          }
                        />
                      );
                    })}
                  </View>
                </Reanimated.View>
              );
            })}
          </Reanimated.View>
        </View>
      </ScrollView>
    </>
  );
};

const getParagraphStyle = (type?: string): string => {
  switch (type) {
    case "chorus":
      return "border-l-4 border-l-blue-500";
    case "verse":
      return "border-l-4 border-l-gray-500";
    case "bridge":
      return "border-l-4 border-l-purple-500";
    case "intro":
      return "border-l-4 border-l-green-500";
    case "outro":
      return "border-l-4 border-l-yellow-500";
    default:
      return "border-l-4 border-l-gray-400";
  }
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
