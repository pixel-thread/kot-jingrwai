import { Stack, usePathname } from 'expo-router';
import { useSongs } from '~/src/hooks/song/useSongs';

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
      }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};
