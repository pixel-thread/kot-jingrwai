import { View, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { Text } from '~/src/components/ui/typography';
import { cn } from '~/src/libs/cn';
import { SongT } from '@repo/types';
import { useRouter } from 'expo-router';

type FeaturedSongCardProps = { song: SongT };

const CARD_WIDTH = 160;
const CARD_HEIGHT = 160;

export const FeaturedSongCard = ({ song }: FeaturedSongCardProps) => {
  const { number: songNumber, author } = song.metadata;
  const { title } = song;
  const router = useRouter();

  return (
    <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
      <Reanimated.View entering={FadeIn.duration(400)}>
        <TouchableOpacity
          onPress={() => router.push(`/songs/${song.id}`)}
          style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
          className={cn('overflow-hidden rounded-xl bg-white dark:bg-gray-800')}
          activeOpacity={0.8}>
          <View className="h-[100px] items-center justify-center">
            <Text size="5xl" weight="black" className="text-indigo-500">
              {songNumber}
            </Text>
          </View>

          <View className="p-3">
            <Text
              weight="semibold"
              numberOfLines={1}
              className="text-center text-gray-800 dark:text-white">
              {title}
            </Text>

            <View className="mt-1 flex-row items-center justify-center">
              <MaterialCommunityIcons name="account" size={14} color="#9CA3AF" />
              <Text size="xs" variant="muted" numberOfLines={1} className="ml-1">
                {author ?? 'N/A'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Reanimated.View>
    </View>
  );
};
