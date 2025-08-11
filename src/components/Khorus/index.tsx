import { useCallback, useMemo, useState, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import Reanimated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Container } from '~/src/components/Common/Container';
import { khoros as allSongs } from '~/src/libs/khoros';
import { Text } from '~/src/components/ui/typography';
import { PAGE_SIZE } from '~/src/libs/constant';
import { SearchBar } from '../Common/search/SearchBar';
import { EmptyKhorusState } from './EmptyKhorusState';
import { KhorusListItem } from './KhorusListItems';

export const KhorusPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Animation values
  const headerOpacity = useSharedValue(0);
  const listOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    listOpacity.value = withTiming(1, { duration: 1000 });
  }, []);

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

  const paginatedSongs = useMemo(
    () => filteredSongs.slice(0, page * PAGE_SIZE),
    [page, filteredSongs]
  );

  const loadMore = useCallback(() => {
    if (paginatedSongs.length < filteredSongs.length) {
      setPage((prev) => prev + 1);
    }
  }, [paginatedSongs.length, filteredSongs.length]);

  const onSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1); // reset to first page when searching
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });

  const listAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: listOpacity.value,
    };
  });

  return (
    <Container className="flex-1 dark:bg-gray-950">
      <Reanimated.View
        style={headerAnimatedStyle}
        className="mb-2 w-full items-center justify-center rounded-b-3xl bg-gradient-to-r from-indigo-600 to-purple-600 py-5 shadow-lg">
        <Text size={'2xl'} weight={'extrabold'} className="mb-1 uppercase">
          Khorus
        </Text>
      </Reanimated.View>

      <Reanimated.View style={listAnimatedStyle} className="-mt-4 flex-1 px-4">
        <FlashList
          data={paginatedSongs}
          renderItem={({ item, index }) => (
            <Reanimated.View entering={FadeInRight.delay(index * 100).duration(400)}>
              <KhorusListItem song={item} />
            </Reanimated.View>
          )}
          estimatedItemSize={100}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          stickyHeaderHiddenOnScroll={true}
          ListHeaderComponent={() => (
            <SearchBar label="Find Your Khoros" onSearch={onSearch} value={searchQuery} />
          )}
          ListEmptyComponent={() => <EmptyKhorusState />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </Reanimated.View>
    </Container>
  );
};
