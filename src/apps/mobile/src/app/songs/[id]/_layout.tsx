import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform, ToastAndroid, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSwipeGesture } from "~/src/hooks/useSwipeGesture";
import { useTapGesture } from "~/src/hooks/useTapGesture";
import { useSongStore } from "@repo/libs";
import { useQuery } from "@tanstack/react-query";
import { getSongs } from "~/src/services/songs/getSongs";
import { useSong } from "~/src/hooks/song/useSong";

export default function SongDetailsLayout() {
  const { id: songId } = useLocalSearchParams<{ id: string }>();
  const [id, setId] = useState<string>(songId);

  const { addFavoriteSong } = useSongStore();

  const router = useRouter();

  const { data: song, isFetching } = useSong({ id: id || "" });

  const { width: windowWidth } = useWindowDimensions();

  const doubleTapRef = useRef(null); // Optional ref for external use

  const { data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: () => getSongs({ isAll: true }),
  });

  const changeSong = (isNext: boolean): string => {
    if (!songs) return "";

    const isCurrentSongChorus = !!song?.metadata.isChorus;

    if (song) {
      const currentSongNo = song?.metadata.number;

      const nextSongNo = isNext ? currentSongNo + 1 : currentSongNo - 1;

      const nextSongId = songs?.find(
        (song) =>
          song.metadata.number === nextSongNo && song.metadata.isChorus === isCurrentSongChorus
      )?.id;
      return nextSongId || "";
    }
    return "";
  };

  const handlePrev = () => {
    const prevSongId = changeSong(false);
    if (prevSongId) {
      setId(prevSongId);
      router.replace(`/songs/${prevSongId}`);
    }
  };

  const handleNext = () => {
    const nextSongId = changeSong(true);
    if (nextSongId) {
      setId(nextSongId);
      router.replace(`/songs/${nextSongId}`);
    }
  };

  const handleDoubleTap = () => {
    if (song) {
      if (!song.metadata.isChorus) {
        addFavoriteSong(song.metadata.number);
      }
      if (Platform.OS === "android") {
        ToastAndroid.show("Added to favorites", ToastAndroid.SHORT);
      }
    }
  };

  // Create individual gestures with refs for potential external simultaneity
  const swipeGesture = useSwipeGesture({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
    threshold: 80,
    simultaneousRef: doubleTapRef, // Uncomment if needed elsewhere
  });

  const doubleTapGesture = useTapGesture({
    onTap: handleDoubleTap,
    numberOfTaps: 2,
    // simultaneousRef: someOtherRef, // If needed
  });

  // Compose: Simultaneous lets Pan and Tap run without blocking each other
  const composedGesture = Gesture.Simultaneous(swipeGesture, doubleTapGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <View
        collapsable={false}
        className="flex-1"
        style={{
          width: windowWidth,
        }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </GestureDetector>
  );
}
