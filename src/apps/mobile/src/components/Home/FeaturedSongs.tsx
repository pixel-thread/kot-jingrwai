import { View } from 'react-native';
import Reanimated, { FadeInUp } from 'react-native-reanimated';

import { Text } from '~/src/components/ui/typography';

import { FeaturedSongCard } from './FeaturedSongCard';
import { FlashList } from '@shopify/flash-list';
import { getRandomSongs } from '~/src/utils/getRandomSongs';
import { SongT } from '@repo/types';
import { songs } from '~/src/libs/songs';

export const FeaturedSongs = () => {
  return (
    <Reanimated.View entering={FadeInUp.delay(500).duration(800)} className="my-6">
      <Text size={'xl'} weight={'bold'} className="mb-4 text-gray-800 dark:text-white">
        Random Songs
      </Text>

      <View className="gap-4 gap-x-2">
        <FlashList
          horizontal
          data={getRandomSongs<SongT>(songs, 10)}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="w-2 bg-transparent" />}
          renderItem={({ item }) => <FeaturedSongCard song={item} />}
        />
      </View>
    </Reanimated.View>
  );
};
