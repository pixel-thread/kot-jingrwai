import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { Text } from '~/src/components/ui/typography';
import { cn } from '~/src/libs/cn';
import { SongT } from '~/src/types/song';
import { useSongs } from '~/src/hooks/song/useSongs';
import { useRouter } from 'expo-router';

type FeaturedSongCardProps = {
  song: SongT;
};

export const FeaturedSongCard = ({ song }: FeaturedSongCardProps) => {
  const { number: songNumber, author } = song.metadata;
  const { title } = song;
  const { ChangeSong } = useSongs();
  const router = useRouter();

  const onPress = () => {
    ChangeSong(songNumber);
    router.push('/song');
  };
  return (
    <Reanimated.View entering={FadeIn.duration(500)}>
      <TouchableOpacity
        onPress={onPress}
        className={cn('w-[160px] overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800')}
        style={
          Platform.OS === 'ios'
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }
            : {}
        }>
        <View className={cn('h-[100px]  items-center justify-center')}>
          <Text size={'5xl'} weight={'black'} className="text-indigo-500">
            {songNumber}
          </Text>
        </View>
        <View className="p-3">
          <Text weight="semibold" numberOfLines={1} className="text-gray-800 dark:text-white">
            {title}
          </Text>
          <View className="mt-1 flex-row items-center justify-center">
            <MaterialCommunityIcons name="account" size={14} color="#9CA3AF" />
            <Text size="xs" variant="muted" numberOfLines={1} className="ml-1">
              {author ? author : 'N/A'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Reanimated.View>
  );
};
