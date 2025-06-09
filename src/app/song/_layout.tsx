import { Stack } from 'expo-router';
import { GestureDetector } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useSwipeGesture } from '~/src/hooks/useSwipeGesture';
import { useSongs } from '~/src/hooks/song/useSongs';
import { useTapGesture } from '~/src/hooks/useTapGesture';
import { useSongStore } from '~/src/libs/stores/songs';

export default function KhorusLayout() {
  const { onNextSong, onPreviousSong, song } = useSongs();
  const { addFavoriteSong, favoriteSongs, removeFavoriteSong } = useSongStore();
  const isFavorite = favoriteSongs.includes(song.metadata.number);

  const onTap = () => {
    if (isFavorite) {
      removeFavoriteSong(song.metadata.number);
    } else {
      addFavoriteSong(song.metadata.number);
    }
  };

  const tapGesture = useTapGesture({
    onTap: onTap,
    numberOfTaps: 2,
  });

  const gesture = useSwipeGesture({
    onSwipeLeft: onNextSong,
    onSwipeRight: onPreviousSong,
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <GestureDetector gesture={gesture}>
        <View className="flex-1" collapsable={false}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="index" />
          </Stack>
        </View>
      </GestureDetector>
    </GestureDetector>
  );
}
