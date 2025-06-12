import { Stack } from 'expo-router';
import { FloatingActionButtons } from '~/src/components/Common/FloatingActionButtons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTextStore } from '~/src/libs/stores/text';
import colors from 'tailwindcss/colors';
import { useColorScheme } from 'nativewind';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { useSongs } from '~/src/hooks/song/useSongs';
import { TouchableOpacity, View } from 'react-native';
import { useSongStore } from '~/src/libs/stores/songs';
import { useEffect, useState } from 'react';

const HeaderLeft = () => {
  const { song } = useSongs();
  const { favoriteSongs, addFavoriteSong, removeFavoriteSong } = useSongStore();
  const isFavorite = favoriteSongs.includes(song.metadata.number);

  const onPressFavorite = () => {
    if (isFavorite) {
      removeFavoriteSong(song.metadata.number);
    } else {
      addFavoriteSong(song.metadata.number);
    }
  };

  return (
    <>
      <View>
        <TouchableOpacity onPress={onPressFavorite}>
          <FontAwesome
            name={isFavorite ? 'bookmark' : 'bookmark-o'}
            size={24}
            color={isFavorite ? colors.orange[500] : colors.gray[500]}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default function SongLayout() {
  const { colorScheme } = useColorScheme();
  const [isShowFloatingButton, setIsShowFloatingButton] = useState(false);
  const isDarkMode = colorScheme === 'dark';
  const { song } = useSongs();
  const { increaseTextSize, decreaseTextSize } = useTextStore();

  useEffect(() => {
    if (isShowFloatingButton) {
      setTimeout(() => {
        setIsShowFloatingButton(false);
      }, 5000);
    }
  }, [setIsShowFloatingButton, isShowFloatingButton]);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          title: song.metadata.number.toString(),
          header: ({ options }) => (
            <CustomHeader options={options} back={true} headerLeft={<HeaderLeft />} />
          ),
        }}>
        <Stack.Screen name="index" />
      </Stack>
      <FloatingActionButtons
        isVisible
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
    </>
  );
}
