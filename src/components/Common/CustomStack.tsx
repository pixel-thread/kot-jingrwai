import { Stack, usePathname } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { useSongs } from '~/src/hooks/song/useSongs';
import { useTextStore } from '~/src/libs/stores/text';
import { Text } from '../ui/typography';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { logger } from '~/src/utils/logger';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';

export const CustomStack = () => {
  const { song } = useSongs();
  const pathName = usePathname();
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const isChordsPage = pathName === '/chorus';
  const isSongPage = pathName === '/song';
  const isAllSongPage = pathName === '/songs';
  const title = isSongPage
    ? song.metadata.number.toString()
    : isChordsPage
      ? 'Ki Khorus'
      : isAllSongPage
        ? 'Ki Jing Rwai'
        : 'Ka Kot Jing Rwai';
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: title,
        headerShadowVisible: true,
        headerBackTitle: 'Back',
        headerTitleAlign: 'left',
        animation: 'ios_from_right',
        headerBackButtonDisplayMode: 'minimal',
        headerRight: () => <RightHeaderButtons />,
        headerStyle: {
          backgroundColor: isDarkMode ? colors.gray[950] : colors.gray[200],
        },
        headerTitleStyle: {
          color: isDarkMode ? colors.gray[200] : colors.gray[950],
        },
      }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

const RightHeaderButtons = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { size, cycleTextSize } = useTextStore();
  const pathName = usePathname();
  const isSongPage = pathName === '/song';

  const onClickDarkMode = () => {
    if (colorScheme === 'light') {
      setColorScheme('dark');
      setIsDarkMode(true);
    } else {
      setColorScheme('light');
      setIsDarkMode(false);
    }
  };
  if (isSongPage) {
    return (
      <View className="flex-row gap-x-2">
        <TouchableOpacity className="" onPress={cycleTextSize}>
          <Text className="pr-2 uppercase">{size}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  logger.log(colorScheme);
  return (
    <View className="">
      <TouchableOpacity onPress={onClickDarkMode}>
        {isDarkMode ? (
          <FontAwesome
            name="sun-o"
            size={20}
            color={isDarkMode ? colors.gray[200] : colors.gray[400]}
          />
        ) : (
          <FontAwesome
            name="moon-o"
            size={20}
            color={isDarkMode ? colors.gray[200] : colors.black[400]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
