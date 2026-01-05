import { View } from 'react-native';
import Reanimated, { FadeInUp } from 'react-native-reanimated';
import { useQuery } from '@tanstack/react-query';

import { Text, FeaturedSongCard } from '@repo/ui-native';
import { getFeaturedSongs } from '~/src/services/songs/getFeaturedSongs';
import { FlatList } from 'react-native-gesture-handler';

export const FeaturedSongs = () => {
  const { data: songs = [] } = useQuery({
    queryKey: ['featured-songs'],
    queryFn: getFeaturedSongs,
  });

  return (
    <Reanimated.View entering={FadeInUp.delay(300).duration(600)} className="my-6">
      <Text size="xl" weight="bold" className="mb-4 text-gray-800 dark:text-white">
        Featured Songs
      </Text>

      <View className="py-1">
        <FlatList
          horizontal
          data={songs}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          renderItem={({ item }) => <FeaturedSongCard song={item} />}
        />
      </View>
    </Reanimated.View>
  );
};
