import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Container } from '~/src/components/Common/Container';
import { Text } from '~/src/components/ui/typography';
import { useSongs } from '~/src/hooks/song/useSongs';
import { songs as allSongs } from '~/src/libs/songs';
import { PAGE_SIZE } from '~/src/libs/constant';
import { SongT } from '~/src/types/song';
import { Button } from '../ui/button';
import { NotFoundSong } from './NotFoundSong';

export const AllSongPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allSongs;

    return allSongs.filter(
      ({ title, metadata }) =>
        title.toLowerCase().includes(query) ||
        metadata.author?.toLowerCase().includes(query) ||
        metadata.composer?.toLowerCase().includes(query) ||
        metadata.number.toString().includes(query)
    );
  }, [searchQuery]);

  const paginatedSongs = filteredSongs.slice(0, page * PAGE_SIZE);

  const loadMore = useCallback(() => {
    if (paginatedSongs.length < filteredSongs.length) {
      setPage((prev) => prev + 1);
    }
  }, [paginatedSongs.length, filteredSongs.length]);

  const onSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1); // reset to first page when searching
  }, []);

  return (
    <Container className="flex-1 px-4">
      <FlashList
        data={paginatedSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongListItem song={item} />}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
        StickyHeaderComponent={() => <SearchBar onSearch={onSearch} value={searchQuery} />}
        stickyHeaderHiddenOnScroll={true}
        ListHeaderComponent={() => <SearchBar onSearch={onSearch} value={searchQuery} />}
        ListEmptyComponent={() => <NotFoundSong />}
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
          <View className="mr-3 h-14 w-14 items-center justify-center rounded-full bg-indigo-200 p-1 dark:bg-indigo-800">
            <Text weight="semibold">{song.metadata.number}</Text>
          </View>
          <View className="flex-1">
            <Text size="lg" weight="normal">
              {song.title}
            </Text>
            <Text size="sm" variant="muted">{`Written By: ${song.metadata.author || 'N/A'}`}</Text>
            <Text size="sm" variant="muted">{`Composer: ${song.metadata.composer || 'N/A'}`}</Text>
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

const SearchBar = React.memo(({ onSearch, value }: SearchBarProps) => {
  const [searchValue, setValue] = useState(value);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View className="bg-gray-200 p-2 dark:bg-gray-950">
      <View className="flex-row items-center gap-x-2">
        <View className="w-full flex-1">
          <TextInput
            ref={inputRef}
            placeholder="Search by title, author, composer, or song number"
            className="h-14 w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-base dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            placeholderTextColor="#9ca3af"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            defaultValue={value}
            value={searchValue}
            onChangeText={(text) => setValue(text)}
          />
        </View>
        <View>
          <Button disabled={!searchValue} title="Wad" onPress={() => onSearch(searchValue)} />
        </View>
      </View>
    </View>
  );
});
