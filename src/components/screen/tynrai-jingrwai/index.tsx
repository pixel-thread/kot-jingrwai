import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { tynraiJingrwai } from '~/src/libs/tynrai-jingrwai';
import { TynraiJingrwaiT } from '~/src/types/tynrai-jingrwai';
import { SongT } from '~/src/types/song';
import { CategoryItem } from './CategoryItems';
import { ContentSection } from '../../Common/ContentSection';
import { songs } from '~/src/libs/songs';
import { Ionicons } from '@expo/vector-icons';
import { useSongs } from '~/src/hooks/song/useSongs';
import { router } from 'expo-router';

export default function TynraiJingrwaiScreen() {
  const [contentVisible, setContentVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TynraiJingrwaiT | null>(null);
  const [filteredSongs, setFilteredSongs] = useState<SongT[]>([]);
  const { ChangeSong } = useSongs();
  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const filterSongsByRange = (category: TynraiJingrwaiT) => {
    const filtered = songs.filter((song) => {
      const songNumber = song.metadata.number;
      return songNumber >= category.from && songNumber <= category.to;
    });
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

  const toggleSongExpansion = (songId: number) => {
    ChangeSong(songId);
    router.push('/song');
  };

  const getFirstLine = (song: SongT): string => {
    const firstParagraph = song.paragraphs.sort((a, b) => a.order - b.order)[0];
    return firstParagraph?.lines[0] || '';
  };

  const renderSongDropdown = (song: SongT) => {
    const firstLine = getFirstLine(song);

    return (
      <Reanimated.View
        key={song.id}
        entering={FadeInDown.delay(100).duration(300)}
        className="mb-2 overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
        {/* Dropdown Header - Always visible */}
        <TouchableOpacity
          onPress={() => toggleSongExpansion(song.metadata.number)}
          className="flex-row items-center justify-between p-4">
          <View className="mr-3 flex-1">
            <Text className="mb-1 text-base font-medium text-gray-900 dark:text-white">
              {song.metadata.number}. {song.title}
            </Text>
            <Text className="text-sm italic text-gray-600 dark:text-gray-400">{firstLine}</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="arrow-forward" size={20} color={'#3b82f6'} />
          </View>
        </TouchableOpacity>
      </Reanimated.View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-950">
      <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
        {contentVisible && (
          <>
            {selectedCategory ? (
              // Song List View with Dropdowns
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

                {/* Render filtered songs as dropdowns */}
                {filteredSongs.length > 0 ? (
                  filteredSongs.map((song) => renderSongDropdown(song))
                ) : (
                  <ContentSection title="No Songs Found">
                    <View className="p-4">
                      <Text className="text-center text-gray-500 dark:text-gray-400">
                        No songs found in the range {selectedCategory.from}-{selectedCategory.to}
                      </Text>
                    </View>
                  </ContentSection>
                )}
              </>
            ) : (
              // Category List View (Original)
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
