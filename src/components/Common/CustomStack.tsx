import { Stack, usePathname } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { useSongs } from '~/src/hooks/song/useSongs';
import { useTextStore } from '~/src/libs/stores/text';
import { Text } from '../ui/typography';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';

export const CustomStack = () => {
  const { song } = useSongs();
  const pathName = usePathname();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const isChordsPage = pathName === '/chorus' || pathName === '/Khorus/[khorusNo]';
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
  const isDarkMode = colorScheme === 'dark';
  const { size, cycleTextSize } = useTextStore();
  const pathName = usePathname();
  const isSongPage = pathName === '/song';

  const onClickDarkMode = () => {
    setColorScheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {isSongPage ? (
        <TouchableOpacity onPress={cycleTextSize} style={{ paddingHorizontal: 8 }}>
          <Text style={{ textTransform: 'uppercase' }}>{size}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onClickDarkMode}
          style={{
            padding: 8,
          }}>
          <FontAwesome
            name={isDarkMode ? 'sun-o' : 'moon-o'}
            size={18}
            color={isDarkMode ? colors.gray[200] : colors.gray[800]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
