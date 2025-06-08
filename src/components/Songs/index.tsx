import { View, TouchableOpacity } from 'react-native';
import { Container } from '../Container';
import { songs as allSongs } from '~/src/libs/songs';
import { useRouter } from 'expo-router';
import { useSongs } from '~/src/hooks/song/useSongs';
import { Text } from '~/src/components/ui/typography';
import { SongT } from '~/src/types/song';
import { FlashList } from '@shopify/flash-list';
import { useState, useCallback } from 'react';
import { PAGE_SIZE } from '~/src/libs/constant';

export const AllSongPage = () => {
  const [page, setPage] = useState(1);

  const paginatedSongs = allSongs.slice(0, page * PAGE_SIZE);

  const loadMore = useCallback(() => {
    if (paginatedSongs.length < allSongs.length) {
      setPage((prev) => prev + 1);
    }
  }, [paginatedSongs.length]);

  return (
    <Container className="flex-1 px-4">
      <FlashList
        data={paginatedSongs}
        renderItem={({ item }) => <SongListItem song={item} />}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-200 dark:bg-gray-800" />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
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
