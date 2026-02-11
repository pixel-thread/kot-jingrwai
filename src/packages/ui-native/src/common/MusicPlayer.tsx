import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "../ui/typography";
import { ToastAndroid, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { useAudioPlayer } from "expo-audio";
import { SongT } from "@repo/types";
import { cn } from "@repo/libs";

type Props = {
  musicUrl: string | undefined;
  song: SongT;
  onNextSong: () => void;
  onPreviousSong: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export const MusicPlayer = ({ musicUrl, song, onNextSong, onPreviousSong, isLoading }: Props) => {
  const { colorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  const [isPlaying, setIsPlaying] = React.useState(false);

  const audioPlayer = useAudioPlayer(musicUrl);

  const onReset = () => {
    audioPlayer.seekTo(0);
    setIsPlaying(true);
  };

  const onPlayPause = () => {
    if (isLoading) return;

    if (!musicUrl) {
      ToastAndroid.show("No track found for this song", ToastAndroid.SHORT);
      return;
    }

    if (isPlaying) {
      audioPlayer.pause();
      setIsPlaying(false);
      return;
    } else {
      audioPlayer.play();
      setIsPlaying(true);
      return;
    }
  };

  const isDisabled = musicUrl ? false : true;
  const isTrackExist = musicUrl ? true : false;

  return (
    <View className="w-auto flex-1 flex-row items-center justify-between rounded-xl border border-gray-500/40 bg-black/5 px-2 py-2 dark:border-gray-800 dark:bg-gray-900/5">
      <View className="flex-1 flex-row items-center">
        <View className="mr-3 h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 dark:bg-indigo-950">
          <MaterialCommunityIcons name="music-note-eighth" size={18} color="white" />
        </View>
        <View className="flex-1">
          <Text numberOfLines={1} className="text-xs font-semibold text-gray-900 dark:text-gray-50">
            {song?.title || "Now playing"}
          </Text>
          <Text numberOfLines={1} className="text-[11px] text-gray-500 dark:text-gray-400">
            {song?.metadata.author || song?.metadata.number || "Unknown"}
          </Text>
        </View>
      </View>

      <View className="ml-3 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => onPreviousSong()}
          className="h-8 w-8 items-center justify-center rounded-full bg-gray-900/5 dark:bg-gray-100/5">
          <MaterialCommunityIcons
            name="skip-previous"
            size={18}
            color={isDarkMode ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPlayPause}
          disabled={isDisabled}
          className={cn(
            "h-9 w-9 items-center justify-center rounded-full",
            isTrackExist ? "bg-gray-900 dark:bg-gray-50" : "bg-gray-900/5 dark:bg-gray-100/5"
          )}>
          <MaterialCommunityIcons
            name={isPlaying ? "pause" : "play"}
            size={18}
            color={isDarkMode ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onReset}
          disabled={isDisabled}
          className="h-9 w-9 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-50">
          <MaterialCommunityIcons
            name={isPlaying ? "restart" : "restart-off"}
            size={18}
            color={isDarkMode ? "black" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNextSong()}
          className="h-8 w-8 items-center justify-center rounded-full bg-gray-900/5 dark:bg-gray-100/5">
          <MaterialCommunityIcons
            name="skip-next"
            size={18}
            color={isDarkMode ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
