import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { View, TouchableOpacity } from 'react-native';
import { Container } from '~/src/components/Common/Container';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { LyricView } from '~/src/components/Lyric/LyricView';
import { Text } from '~/src/components/ui/typography';
import { getUniqueSongs } from '~/src/services/song/getUniqueSong';

import { useTextStore } from '~/src/libs/stores/text';
import { gray } from 'tailwindcss/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { FloatingActionButtons } from '~/src/components/Common/FloatingActionButtons';
import { MiniMusicPlayer } from '~/src/components/Common/MiniMusicPlayer';

const HeaderRight = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { increaseTextSize, decreaseTextSize } = useTextStore();

  return (
    <View className="flex-row items-center gap-x-4">
      <TouchableOpacity
        onPress={increaseTextSize}
        className="h-10 w-10 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-600/50">
        <MaterialCommunityIcons
          name={'plus'}
          size={24}
          color={isDarkMode ? gray[200] : gray[950]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={decreaseTextSize}
        className="h-10 w-10 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-600/50">
        <MaterialCommunityIcons
          name={'minus'}
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
    queryKey: ['song', id],
    queryFn: () => getUniqueSongs({ id }),
    enabled: !!id,
  });

  if (!song || isFetching) {
    return (
      <View className="flex-1">
        <Stack.Screen
          options={{
            headerShown: true,
            title: song?.metadata?.number?.toString() || 'No Title',
            header: ({ options }) => (
              <CustomHeader options={options} back headerRight={<HeaderRight />} />
            ),
          }}
        />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: song?.metadata?.number?.toString() || 'No Title',
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<HeaderRight />} />
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
