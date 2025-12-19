import { View, ScrollView } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { TynraiJingrwaiT } from '~/src/types/tynrai-jingrwai';
import { SongT } from '~/src/types/song';
import { FlashList } from '@shopify/flash-list';
import { useSongs } from '~/src/hooks/song/useSongs';
import * as Constants from 'expo-constants';
import { SongListItem } from '~/src/components/Songs/SongListItem';
import { ContentSection } from '~/src/components/Common/ContentSection';
import { useQuery } from '@tanstack/react-query';
import { getTynraiJingrwaiById } from '~/src/services/tynrai-jingrwai/getTynraiJingrwaiById';

type Props = {
  id: string;
};

export default function TynraiJingrwaiDetail({ id }: Props) {
  const { data: songs = [] } = useSongs({ isChorus: false });

  const { data: selectedCategory } = useQuery({
    queryKey: ['tynrai jingrwai', id],
    queryFn: async () => await getTynraiJingrwaiById({ id }),
  });

  const [filteredSongs, setFilteredSongs] = useState<SongT[]>([]);

  const filterSongsByRange = (category: TynraiJingrwaiT) => {
    const filtered = songs
      .filter((song) => {
        const songNumber = song.metadata.number;
        return songNumber >= category.from && songNumber <= category.to;
      })
      .reverse();
    setFilteredSongs(filtered);
  };

  useEffect(() => {
    if (selectedCategory) {
      filterSongsByRange(selectedCategory);
    }
  }, [selectedCategory]);

  const renderSongDropdown = (song: SongT) => {
    return (
      <View className="my-1">
        <SongListItem song={song} />
      </View>
    );
  };

  return (
    <ScrollView className="h-auto flex-1 bg-gray-200 dark:bg-gray-950">
      <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
        <FlashList
          data={filteredSongs}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          renderItem={({ item }) => renderSongDropdown(item)}
          ListEmptyComponent={() => (
            <ContentSection title="No Songs Found">
              <View className="p-4">
                <Text className="text-center text-gray-500 dark:text-gray-400">
                  No songs found in the range {selectedCategory?.from}-{selectedCategory?.to}
                </Text>
              </View>
            </ContentSection>
          )}
        />
        {/* Footer */}
        <Reanimated.View entering={FadeInDown.delay(500).duration(500)} className="mb-4 mt-8">
          <Text className="text-center text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} {Constants.default.expoConfig?.name || 'Kot Ong'}. All
            rights reserved.
          </Text>
        </Reanimated.View>
      </Reanimated.View>
    </ScrollView>
  );
}
