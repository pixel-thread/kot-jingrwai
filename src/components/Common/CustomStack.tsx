import { Stack, usePathname } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { useSongs } from '~/src/hooks/song/useSongs';
import { useTextStore } from '~/src/libs/stores/text';
import { Text } from '../ui/typography';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

export const CustomStack = () => {
  const { song } = useSongs();
  const pathName = usePathname();
  const isSongPage = pathName === '/song';
  const isAllSongPage = pathName === '/songs';
  const title = isSongPage
    ? song.metadata.number.toString()
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
        headerRight: ({ canGoBack, tintColor }) => (
          <RightHeaderButtons canGoBack={canGoBack} color={tintColor} />
        ),
        headerBackButtonMenuEnabled: true,
        headerBlurEffect: 'dark',
      }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

const RightHeaderButtons = ({
  color,
}: {
  color: string | undefined;
  canGoBack: boolean | undefined;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { size, cycleTextSize } = useTextStore();
  const pathName = usePathname();
  const isSongPage = pathName === '/song';
  const onClickDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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

  return (
    <View className="">
      <TouchableOpacity onPress={onClickDarkMode}>
        {isDarkMode ? (
          <FontAwesome name="sun-o" size={20} color={color} />
        ) : (
          <FontAwesome name="moon-o" size={20} color={color} />
        )}
      </TouchableOpacity>
    </View>
  );
};
