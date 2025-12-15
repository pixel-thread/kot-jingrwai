import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '../ui/typography';
import { TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useSongs } from '~/src/hooks/song/useSongs';
import React from 'react';

export const MiniMusicPlayer = () => {
  const { colorScheme } = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  const [isPlaying, setIsPlaying] = React.useState(false);

  const { onNextSong, onPreviousSong, song } = useSongs();

  const onReset = () => {};

  const onPlayPause = () => {};

  return (
    <View className="mb-2 flex-row items-center justify-between rounded-xl border border-gray-500/40 bg-black/5 px-3 py-2 dark:border-gray-800 dark:bg-gray-800/5 ">
      <View className="flex-1 flex-row items-center">
        <View className="mr-3 h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 dark:bg-indigo-950">
          <MaterialCommunityIcons name="music-note-eighth" size={18} color="white" />
        </View>
        <View className="flex-1">
          <Text numberOfLines={1} className="text-xs font-semibold text-gray-900 dark:text-gray-50">
            {song.title || 'Now playing'}
          </Text>
          <Text numberOfLines={1} className="text-[11px] text-gray-500 dark:text-gray-400">
            {song.metadata.author || song.metadata.number || 'Unknown'}
          </Text>
        </View>
      </View>

      <View className="ml-3 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={onPreviousSong}
          className="h-8 w-8 items-center justify-center rounded-full bg-gray-900/5 dark:bg-gray-100/5">
          <MaterialCommunityIcons
            name="skip-previous"
            size={18}
            color={isDarkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPlayPause}
          className="h-9 w-9 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-50">
          <MaterialCommunityIcons
            name={isPlaying ? 'pause' : 'play'}
            size={18}
            color={isDarkMode ? 'black' : 'white'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onReset}
          className="h-9 w-9 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-50">
          <MaterialCommunityIcons
            name={isPlaying ? 'restart' : 'restart-off'}
            size={18}
            color={isDarkMode ? 'black' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNextSong}
          className="h-8 w-8 items-center justify-center rounded-full bg-gray-900/5 dark:bg-gray-100/5">
          <MaterialCommunityIcons
            name="skip-next"
            size={18}
            color={isDarkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
