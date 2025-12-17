import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { tynraiJingrwai } from '~/src/libs/tynrai-jingrwai';
import { TynraiJingrwaiT } from '~/src/types/tynrai-jingrwai';
import { SongT } from '~/src/types/song';
import { CategoryItem } from './CategoryItems';
import { ContentSection } from '../../Common/ContentSection';
import { SongListItem } from '../../Songs/SongListItem';
import { FlashList } from '@shopify/flash-list';
import { useSongs } from '~/src/hooks/song/useSongs';

export default function TynraiJingrwaiScreen() {
  const [contentVisible, setContentVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TynraiJingrwaiT | null>(null);
  const { data: songs = [] } = useSongs({ isChorus: false });
  const [filteredSongs, setFilteredSongs] = useState<SongT[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filterSongsByRange = (category: TynraiJingrwaiT) => {
    const filtered = songs
      .filter((song) => {
        const songNumber = song.metadata.number;
        return songNumber >= category.from && songNumber <= category.to;
      })
      .reverse();
    setFilteredSongs(filtered);
    setSelectedCategory(category);
  };

  const handleCategoryPress = (category: TynraiJingrwaiT) => {
    filterSongsByRange(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setFilteredSongs([]);
  };

  const renderSongDropdown = (song: SongT) => {
    return <SongListItem song={song} />;
  };

  return (
    <ScrollView className="h-auto flex-1 bg-gray-200 dark:bg-gray-950">
      <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
        {contentVisible && (
          <>
            {selectedCategory ? (
              <>
                <ContentSection
                  title={`${selectedCategory.title} (${selectedCategory.from}-${selectedCategory.to})`}>
                  <View className="p-4">
                    <View className="flex flex-1 flex-row items-center justify-between">
                      <Text className="text-gray-700 dark:text-gray-300">
                        Found {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''}
                      </Text>
                      <TouchableOpacity onPress={handleBackToCategories}>
                        <Text className="text-center font-medium text-blue-600 dark:text-blue-400">
                          Back to Categories
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ContentSection>
                <FlashList
                  data={filteredSongs}
                  keyExtractor={(item) => item.id}
                  estimatedItemSize={20}
                  renderItem={({ item }) => (
                    <View className="my-1">{renderSongDropdown(item)}</View>
                  )}
                  ListEmptyComponent={() => (
                    <ContentSection title="No Songs Found">
                      <View className="p-4">
                        <Text className="text-center text-gray-500 dark:text-gray-400">
                          No songs found in the range {selectedCategory.from}-{selectedCategory.to}
                        </Text>
                      </View>
                    </ContentSection>
                  )}
                />
              </>
            ) : (
              <>
                <ContentSection title="Tynrai Jingrwai">
                  <View className="p-4">
                    <Text className="mb-4 text-gray-700 dark:text-gray-300">
                      Explore the Kot Jingrwai content organized by categories. Select a category to
                      view songs within that range.
                    </Text>
                  </View>
                </ContentSection>

                {tynraiJingrwai.map((category, index) => (
                  <ContentSection key={index} title={category.title}>
                    <CategoryItem
                      title={category.title}
                      range={`${category.from} - ${category.to}`}
                      onPress={() => handleCategoryPress(category)}
                    />
                  </ContentSection>
                ))}
              </>
            )}

            {/* Footer */}
            <Reanimated.View entering={FadeInDown.delay(500).duration(500)} className="mb-4 mt-8">
              <Text className="text-center text-xs text-gray-500 dark:text-gray-500">
                © {new Date().getFullYear()} Kot Jingrwai. All rights reserved.
              </Text>
            </Reanimated.View>
          </>
        )}
      </Reanimated.View>
    </ScrollView>
  );
}
