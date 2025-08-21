import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, { FadeInRight } from 'react-native-reanimated';
import { songs } from '~/src/libs/songs';
import { Text } from '~/src/components/ui/typography';
import { ContentSection } from '../Common/ContentSection';
import { SongListItem } from '../Songs/SongListItem';
import { FlashList } from '@shopify/flash-list';

type SongListProps = {
  title: string;
  songNumbers: number[];
  emptyMessage: string;
};

export const SongList = ({ title, songNumbers = [], emptyMessage }: SongListProps) => {
  const router = useRouter();

  const filteredSongs = songs.filter((song) => songNumbers.includes(song.metadata.number));

  return (
    <ContentSection title={title} className="border-transparent p-1 dark:border-transparent">
      <View className="overflow-hidden rounded-xl">
        <FlashList
          data={filteredSongs || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Reanimated.View
              className={'my-1'}
              entering={FadeInRight.delay(index * 100).duration(400)}>
              <SongListItem song={item} />
            </Reanimated.View>
          )}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={20}
          onEndReachedThreshold={0.5}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={() => (
            <View className="items-center justify-center rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <MaterialCommunityIcons name="playlist-music" size={40} color="#9CA3AF" />
              <Text variant="muted" className="mt-2 text-center">
                {emptyMessage}
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/songs')}
                className="mt-3 rounded-full bg-indigo-100 px-4 py-2 dark:bg-indigo-900">
                <Text size="sm" className="text-indigo-600 dark:text-indigo-400">
                  Browse Songs
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ContentSection>
  );
};
