import { Stack } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useSwipeGesture } from '~/src/hooks/useSwipeGesture';
import { useSongs } from '~/src/hooks/song/useSongs';
import { useTapGesture } from '~/src/hooks/useTapGesture';
import { useSongStore } from '~/src/libs/stores/songs';
import { FloatingActionButtons } from '~/src/components/Common/FloatingActionButtons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { useTextStore } from '~/src/libs/stores/text';
import colors from 'tailwindcss/colors';
import { useColorScheme } from 'nativewind';

export default function SongLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { increaseTextSize, decreaseTextSize } = useTextStore();
  const [isShowFloatingButton, setIsShowFloatingButton] = useState(false);
  const { onNextSong, onPreviousSong, song } = useSongs();
  const { addFavoriteSong, favoriteSongs, removeFavoriteSong } = useSongStore();
  const isFavorite = favoriteSongs.includes(song.metadata.number);

  const singleTap = () => setIsShowFloatingButton(true);
  const doubleTap = () => {
    if (isFavorite) {
      removeFavoriteSong(song.metadata.number);
    } else {
      addFavoriteSong(song.metadata.number);
    }
  };

  const singleTapGesture = useTapGesture({
    onTap: singleTap,
    numberOfTaps: 1,
  });
  const doubleTapGesture = useTapGesture({
    onTap: doubleTap,
    numberOfTaps: 2,
  });

  const leftRightGesture = useSwipeGesture({
    onSwipeLeft: onNextSong,
    onSwipeRight: onPreviousSong,
  });

  const combinedGesture = Gesture.Simultaneous(
    leftRightGesture,
    doubleTapGesture,
    singleTapGesture
  );

  useEffect(() => {
    if (isShowFloatingButton) {
      setTimeout(() => {
        setIsShowFloatingButton(false);
      }, 5000);
    }
  }, [setIsShowFloatingButton, isShowFloatingButton]);

  return (
    <GestureDetector gesture={combinedGesture}>
      <View className="flex-1" collapsable={false}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="index" />
        </Stack>
        <FloatingActionButtons
          isVisible={isShowFloatingButton}
          buttons={[
            {
              onPress: increaseTextSize,
              icon: (
                <FontAwesome
                  color={isDarkMode ? colors.gray[200] : colors.gray[950]}
                  name="plus"
                  size={20}
                />
              ),
            },
            {
              onPress: decreaseTextSize,
              icon: (
                <FontAwesome
                  name="minus"
                  size={20}
                  color={isDarkMode ? colors.gray[200] : colors.gray[950]}
                />
              ),
            },
          ]}
        />
      </View>
    </GestureDetector>
  );
}
