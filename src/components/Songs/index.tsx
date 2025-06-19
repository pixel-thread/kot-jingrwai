import { View, TouchableOpacity, TextInput } from 'react-native';
import { Container } from '~/src/components/Common/Container';
import { songs as allSongs } from '~/src/libs/songs';
import { useRouter } from 'expo-router';
import { useSongs } from '~/src/hooks/song/useSongs';
import { Text } from '~/src/components/ui/typography';
import { SongT } from '~/src/types/song';
import { FlashList } from '@shopify/flash-list';
import { useState, useCallback, useMemo } from 'react';
import { PAGE_SIZE } from '~/src/libs/constant';

export const AllSongPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return allSongs;

    const query = searchQuery.toLowerCase();
    return allSongs.filter((song) => {
      const { title, metadata } = song;
      return (
        title.toLowerCase().includes(query) ||
        metadata.author?.toLowerCase().includes(query) ||
        metadata.composer?.toLowerCase().includes(query) ||
        metadata.number.toString().includes(query)
      );
    });
  }, [searchQuery]);

  const paginatedSongs = filteredSongs.slice(0, page * PAGE_SIZE);

  const loadMore = useCallback(() => {
    if (paginatedSongs.length < filteredSongs.length) {
      setPage((prev) => prev + 1);
    }
  }, [paginatedSongs.length, filteredSongs.length]);

  return (
    <Container className="flex-1 px-4">
      <SearchBar value={searchQuery} onSearch={setSearchQuery} />
      <FlashList
        data={paginatedSongs}
        showsVerticalScrollIndicator
        stickyHeaderHiddenOnScroll
        renderItem={({ item }) => <SongListItem song={item} />}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-200 dark:bg-gray-800" />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => <EmptyState />}
        keyboardShouldPersistTaps="handled"
      />
    </Container>
  );
};

const SongListItem = ({ song }: { song: SongT }) => {
  const router = useRouter();
  const { ChangeSong } = useSongs();

  return (
    <TouchableOpacity
      onPress={() => {
        ChangeSong(song.metadata.number);
        router.push('/song');
      }}
      className="border-b border-gray-200 px-2 py-3 dark:border-gray-800">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-indigo-200 p-1 dark:bg-indigo-800">
            <Text weight="semibold">{song.metadata.number}</Text>
          </View>
          <View className="flex-1">
            <Text size="lg" weight="medium">
              {song.title}
            </Text>
            <Text size="sm" variant="muted">
              {`Written By: ${song.metadata.author || 'N/A'}`}
            </Text>
            <Text size="sm" variant="muted">
              {`Composer: ${song.metadata.composer || 'N/A'}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type SearchBarProps = {
  onSearch: (query: string) => void;
  value: string;
};

const SearchBar = ({ onSearch, value }: SearchBarProps) => {
  return (
    <View className="px-2">
      <View>
        <Text size="4xl" align={'center'} leading={'loose'} tracking={'widest'} weight="bold">
          Search
        </Text>
      </View>
      <TextInput
        placeholder="Search by title, author, or composer song number"
        className="mb-4 h-16 w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-base dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onSearch}
      />
    </View>
  );
};

const EmptyState = () => (
  <View className="flex h-64 items-center justify-center px-4">
    <Text size="lg" weight="semibold" className="text-center text-gray-500 dark:text-gray-400">
      No songs found matching your search.
    </Text>
  </View>
);
