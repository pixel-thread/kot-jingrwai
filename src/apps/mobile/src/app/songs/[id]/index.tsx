import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { View, TouchableOpacity } from "react-native";
import { Container } from "@repo/ui-native";
import { CustomHeader } from "~/src/components/Common/CustomHeader";
import { LyricView } from "~/src/components/Lyric/LyricView";
import { getUniqueSongs } from "~/src/services/songs/getUniqueSong";

import { useSongStore, useTextStore } from "@repo/libs";
import { gray } from "tailwindcss/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useSongs } from "~/src/hooks/song/useSongs";
import { useSong } from "~/src/hooks/song/useSong";

const HeaderRight = ({ id }: { id: string }) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { increaseTextSize, decreaseTextSize } = useTextStore();
  const { removeFavoriteSong, addFavoriteSong, favoriteSongs } = useSongStore();
  const { data: song, isFetching } = useSong({ id });
  const songNumber = song?.metadata.number;
  const isFavoriteSong = favoriteSongs.includes(songNumber || 0);
  gg;

  const onToggleFavSongs = () => {
    if (song && !isFetching) {
      if (isFavoriteSong) {
        removeFavoriteSong(song.metadata.number);
      } else {
        addFavoriteSong(song.metadata.number);
      }
    }
  };

  return (
    <View className="flex-row items-center gap-x-4">
      <TouchableOpacity
        onPress={onToggleFavSongs}
        className="h-10 w-10 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-600/50">
        <MaterialCommunityIcons
          name={isFavoriteSong ? "heart" : "heart-outline"}
          size={24}
          color={isDarkMode ? gray[200] : gray[950]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={decreaseTextSize}
        className="h-10 w-10 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-600/50">
        <MaterialCommunityIcons
          name={"minus"}
          size={24}
          color={isDarkMode ? gray[200] : gray[950]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={increaseTextSize}
        className="h-10 w-10 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-600/50">
        <MaterialCommunityIcons
          name={"plus"}
          size={24}
          color={isDarkMode ? gray[200] : gray[950]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={decreaseTextSize}
        className="h-10 w-10 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-600/50">
        <MaterialCommunityIcons
          name={"minus"}
          size={24}
          color={isDarkMode ? gray[200] : gray[950]}
        />
      </TouchableOpacity>
    </View>
  );
};

const SongsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: song, isFetching } = useQuery({
    queryKey: ["song", id],
    queryFn: () => getUniqueSongs({ id }),
    enabled: !!id,
  });

  if (!song || isFetching) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: song?.metadata?.number?.toString() || "Loading",
            header: ({ options }) => (
              <CustomHeader options={options} back headerRight={<HeaderRight id={id || ""} />} />
            ),
          }}
        />
        <Container className="flex-1 bg-gray-200"></Container>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: song?.metadata?.number?.toString() || "No Title",
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<HeaderRight id={id} />} />
          ),
        }}
      />
      <Container>
        <LyricView song={song} />
      </Container>
    </>
  );
};

export default SongsDetails;
