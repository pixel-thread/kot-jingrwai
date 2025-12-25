import { View, ScrollView } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { tynraiJingrwai } from '@repo/constants';
import { TynraiJingrwaiT } from '@repo/types';
import { SongT } from '@repo/types';
import { ContentSection } from '../../Common/ContentSection';
import { SongListItem } from '../../Songs/SongListItem';
import { FlashList } from '@shopify/flash-list';
import { useSongs } from '~/src/hooks/song/useSongs';

type Props = {
  id: string;
};

export const TynraijingrwaiDetails = ({ id }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<TynraiJingrwaiT | null>(null);
  const { data: songs = [] } = useSongs({ isChorus: false });
  const [filteredSongs, setFilteredSongs] = useState<SongT[]>([]);

  const filterSongsByRange = () => {
    const category = tynraiJingrwai.find((category) => category.id === id);
    console.log(tynraiJingrwai);

    if (!category) return;

    const filtered = songs
      .filter((song) => {
        const songNumber = song.metadata.number;
        return songNumber >= category?.from && songNumber <= category?.to;
      })
      .reverse();

    setFilteredSongs(filtered);

    setSelectedCategory(category);
  };

  useEffect(() => {
    filterSongsByRange();
  }, [id]);

  const renderSongDropdown = (song: SongT) => {
    return <SongListItem song={song} />;
  };

  if (!selectedCategory) return null;

  return (
    <ScrollView className="h-auto flex-1 bg-gray-200 dark:bg-gray-950">
      <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
        <FlashList
          data={filteredSongs}
          keyExtractor={(item) => item.id}
          estimatedItemSize={20}
          renderItem={({ item }) => <View className="my-1">{renderSongDropdown(item)}</View>}
          ListEmptyComponent={() => (
            <ContentSection title="No Songs Found">
              <View className="p-4">
                <Text className="text-center text-gray-500 dark:text-gray-400">
                  No songs found in the range {selectedCategory.from}-{selectedCategory?.to}
                </Text>
              </View>
            </ContentSection>
          )}
        />

        {/* Footer */}
        <Reanimated.View entering={FadeInDown.delay(500).duration(500)} className="mb-4 mt-8">
          <Text className="text-center text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Kot Jingrwai. All rights reserved.
          </Text>
        </Reanimated.View>
      </Reanimated.View>
    </ScrollView>
  );
};
