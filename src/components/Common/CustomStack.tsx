import { Stack, usePathname } from 'expo-router';
import { useSongs } from '~/src/hooks/song/useSongs';

export const CustomStack = () => {
  const { song } = useSongs();
  const pathName = usePathname();
  const isHome = pathName === '/';
  const title = isHome ? 'Home' : song.metadata.number.toString();

  return (
    <Stack
      screenOptions={{
        title: title,
        headerShadowVisible: false,
        headerBackTitle: 'Back',
        headerTitleAlign: 'left',
        animation: 'ios_from_right',
        headerBackButtonDisplayMode: 'minimal',
      }}
    />
  );
};
