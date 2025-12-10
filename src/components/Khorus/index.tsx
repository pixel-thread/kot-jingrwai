import { useCallback, useMemo, useState, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import Reanimated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Container } from '~/src/components/Common/Container';
import { PAGE_SIZE } from '~/src/libs/constant';
import { SearchBar } from '../Common/search/SearchBar';
import { EmptyKhorusState } from './EmptyKhorusState';
import { KhorusListItem } from './KhorusListItems';
import { useFilteredSongs } from '~/src/hooks/useFilteredSongs';

export const KhorusPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = useFilteredSongs({ searchQuery, isKhorus: true });
  const headerOpacity = useSharedValue(0);
  const listOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    listOpacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const paginatedSongs = useMemo(
    () => filteredSongs?.slice(0, page * PAGE_SIZE),
    [page, filteredSongs]
  );

  const loadMore = useCallback(() => {
    if (filteredSongs && paginatedSongs) {
      if (paginatedSongs?.length < filteredSongs?.length) {
        setPage((prev) => prev + 1);
      }
    }
  }, [paginatedSongs?.length, filteredSongs?.length]);

  const onSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1); // reset to first page when searching
  }, []);

  const listAnimatedStyle = useAnimatedStyle(() => ({ opacity: listOpacity.value }));

  return (
    <Container className="flex-1 pt-10 dark:bg-gray-950">
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
          ListEmptyComponent={() => <EmptyKhorusState reset={() => onSearch('')} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </Reanimated.View>
    </Container>
  );
};
