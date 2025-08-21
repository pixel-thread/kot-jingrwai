import { useState, useCallback, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import Reanimated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Container } from '~/src/components/Common/Container';
import { Text } from '~/src/components/ui/typography';
import { PAGE_SIZE } from '~/src/libs/constant';
import { NotFoundSong } from './NotFoundSong';
import { SearchBar } from '../Common/search/SearchBar';
import { SongListItem } from './SongListItem';
import { useFilteredSongs } from '~/src/hooks/useFilteredSongs';

export const AllSongPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredSongs = useFilteredSongs({ searchQuery });
  // Animation values
  const headerOpacity = useSharedValue(0);
  const listOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    listOpacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const paginatedSongs = filteredSongs?.slice(0, page * PAGE_SIZE);

  const loadMore = useCallback(() => {
    if (paginatedSongs && filteredSongs) {
      if (paginatedSongs?.length < filteredSongs?.length) {
        setPage((prev) => prev + 1);
      }
    }
  }, [paginatedSongs?.length, filteredSongs?.length]);

  const onSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1); // reset to first page when searching
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({ opacity: headerOpacity.value }));

  const listAnimatedStyle = useAnimatedStyle(() => ({ opacity: listOpacity.value }));

  return (
    <Container className="flex-1 dark:bg-gray-950">
      <Reanimated.View
        style={headerAnimatedStyle}
        className="mb-2 w-full items-center justify-center rounded-b-3xl bg-gradient-to-r from-indigo-600 to-purple-600 py-5 shadow-lg">
        <Text size={'2xl'} weight={'extrabold'} className="mb-1 uppercase">
          Ki Jingrwai
        </Text>
      </Reanimated.View>

      <Reanimated.View style={listAnimatedStyle} className="-mt-4 flex-1 px-4">
        <FlashList
          data={paginatedSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Reanimated.View entering={FadeInRight.delay(index * 100).duration(400)}>
              <SongListItem song={item} />
            </Reanimated.View>
          )}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          keyboardShouldPersistTaps="handled"
          stickyHeaderHiddenOnScroll={true}
          ListHeaderComponent={() => <SearchBar onSearch={onSearch} value={searchQuery} />}
          ListEmptyComponent={() => (
            <NotFoundSong reset={() => searchQuery && setSearchQuery('')} />
          )}
        />
      </Reanimated.View>
    </Container>
  );
};
