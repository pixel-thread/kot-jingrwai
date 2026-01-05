import { useState, useCallback, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import Reanimated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Container } from '@repo/ui-native';
import { PAGE_SIZE } from '~/src/libs/constant';
import { NotFoundSong } from './NotFoundSong';
import { SearchBar } from '@repo/ui-native';
import { SongListItem } from '@repo/ui-native';
import { useFilteredSongs } from '~/src/hooks/useFilteredSongs';

type Props = {
  isKhorus: boolean;
};

export const AllSongPage = ({ isKhorus }: Props) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredSongs = useFilteredSongs({ searchQuery, isKhorus });

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

  const listAnimatedStyle = useAnimatedStyle(() => ({ opacity: listOpacity.value }));

  return (
    <Container className="flex-1 dark:bg-gray-950">
      <Reanimated.View style={listAnimatedStyle} className="flex-1 p-4">
        <SearchBar
          label={isKhorus ? 'Find Your Chorus' : 'Find Your Songs'}
          onSearch={onSearch}
          value={searchQuery}
        />
        <FlashList
          data={paginatedSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Reanimated.View
              className={'my-1'}
              entering={FadeInRight.delay(index * 100).duration(400)}>
              <SongListItem song={item} />
            </Reanimated.View>
          )}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          keyboardShouldPersistTaps="handled"
          stickyHeaderHiddenOnScroll={true}
          ListEmptyComponent={() => (
            <NotFoundSong reset={() => searchQuery && setSearchQuery('')} />
          )}
        />
      </Reanimated.View>
    </Container>
  );
};
