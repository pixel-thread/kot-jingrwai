import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '../ui/typography';
import { ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useSongTrack } from '~/src/hooks/song/useSongTrack';
import { useAudioPlayer } from 'expo-audio';
import { SongT } from '@repo/types';
import { cn } from '~/src/libs/cn';
import { useQuery } from '@tanstack/react-query';
import { getSongs } from '~/src/services/songs/getSongs';
import { useRouter } from 'expo-router';

type Props = {
  song: SongT;
};
export const MiniMusicPlayer = ({ song }: Props) => {
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  const isDarkMode = colorScheme === 'dark';

  const [isPlaying, setIsPlaying] = React.useState(false);

  const { data: songTrack, isFetching } = useSongTrack({ id: song.id || '' });

  const audioPlayer = useAudioPlayer(songTrack?.metadata.downloadUrl);

  const { data: songs } = useQuery({
    queryKey: ['songs'],
    queryFn: () => getSongs({ isAll: true }),
  });

  const changeSong = (isNext: boolean): string => {
    if (!songs) return '';

    const isCurrentSongChorus = !!song?.metadata.isChorus;

    if (song) {
      const currentSongNo = song?.metadata.number;

      const nextSongNo = isNext ? currentSongNo + 1 : currentSongNo - 1;

      const nextSongId = songs?.find(
        (song) =>
          song.metadata.number === nextSongNo && song.metadata.isChorus === isCurrentSongChorus
      )?.id;

      return nextSongId || '';
    }
    return '';
  };

  const onNextSong = () => {
    const idx = changeSong(true);
    if (idx) {
      router.replace(`/songs/${idx}`);
    }
  };

  const onPreviousSong = () => {
    const idx = changeSong(false);
    if (idx) {
      router.replace(`/songs/${idx}`);
    }
  };

  const onReset = () => {
    audioPlayer.seekTo(0);
    setIsPlaying(true);
  };

  const onPlayPause = () => {
    if (!songTrack?.metadata.downloadUrl) {
      ToastAndroid.show('No track found for this song', ToastAndroid.SHORT);
      return;
    }
    if (isPlaying) {
      audioPlayer.pause();
      setIsPlaying(false);
      return;
    } else {
      audioPlayer.play();
      setIsPlaying(true);
      return;
    }
  };

  const isDisabled = songTrack?.metadata.downloadUrl ? false : true || isFetching;
  const isTrackExist = songTrack?.metadata.downloadUrl ? true : false;

  return (
    <View className="w-auto flex-1 flex-row items-center justify-between rounded-xl border border-gray-500/40 bg-black/5 px-2 py-2 dark:border-gray-800 dark:bg-gray-900/5">
      <View className="flex-1 flex-row items-center">
        <View className="mr-3 h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 dark:bg-indigo-950">
          <MaterialCommunityIcons name="music-note-eighth" size={18} color="white" />
        </View>
        <View className="flex-1">
          <Text numberOfLines={1} className="text-xs font-semibold text-gray-900 dark:text-gray-50">
            {song?.title || 'Now playing'}
          </Text>
          <Text numberOfLines={1} className="text-[11px] text-gray-500 dark:text-gray-400">
            {song?.metadata.author || song?.metadata.number || 'Unknown'}
          </Text>
        </View>
      </View>

      <View className="ml-3 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => onPreviousSong()}
          className="h-8 w-8 items-center justify-center rounded-full bg-gray-900/5 dark:bg-gray-100/5">
          <MaterialCommunityIcons
            name="skip-previous"
            size={18}
            color={isDarkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPlayPause}
          disabled={isDisabled}
          className={cn(
            'h-9 w-9 items-center justify-center rounded-full',
            isTrackExist ? 'bg-gray-900 dark:bg-gray-50' : 'bg-gray-900/5 dark:bg-gray-100/5'
          )}>
          <MaterialCommunityIcons
            name={isPlaying ? 'pause' : 'play'}
            size={18}
            color={isDarkMode ? 'black' : 'white'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onReset}
          disabled={isDisabled}
          className="h-9 w-9 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-50">
          <MaterialCommunityIcons
            name={isPlaying ? 'restart' : 'restart-off'}
            size={18}
            color={isDarkMode ? 'black' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNextSong()}
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
