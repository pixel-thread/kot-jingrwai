import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Container } from '~/src/components/Common/Container';
import { Text } from '~/src/components/ui/typography';
import { useSongs } from '~/src/hooks/song/useSongs';
import { songs as allSongs } from '~/src/libs/songs';
import { PAGE_SIZE } from '~/src/libs/constant';
import { SongT } from '~/src/types/song';
import { NotFoundSong } from './NotFoundSong';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';

export const AllSongPage = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
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
        className="mb-2 w-full items-center justify-center rounded-b-3xl bg-gradient-to-r from-indigo-600 to-purple-600 pb-4 pt-2 shadow-lg">
        <Text size={'2xl'} weight={'extrabold'} className="mb-1 uppercase">
          All Songs
        </Text>
        <Text size={'base'} className="text-center opacity-80">
          Browse collection
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
          StickyHeaderComponent={() => <SearchBar onSearch={onSearch} value={searchQuery} />}
          stickyHeaderHiddenOnScroll={true}
          ListHeaderComponent={() => <SearchBar onSearch={onSearch} value={searchQuery} />}
          ListEmptyComponent={() => <NotFoundSong />}
        />
      </Reanimated.View>
    </Container>
  );
};

const SongListItem = ({ song }: { song: SongT }) => {
  const router = useRouter();
  const { ChangeSong } = useSongs();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Animation for press feedback
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 10 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Reanimated.View style={animatedStyle} className="mb-3">
      <TouchableOpacity
        onPress={() => {
          ChangeSong(song.metadata.number);
          router.push('/song');
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800"
        style={
          Platform.OS === 'ios'
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
              }
            : {}
        }>
        <View className="flex-row items-center p-3">
          <View className="mr-3 h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
            <Text size="3xl" weight="bold">
              {song.metadata.number}
            </Text>
          </View>
          <View className="flex-1 border-l border-gray-100 pl-3 dark:border-gray-700">
            <Text
              size="lg"
              weight="semibold"
              className="line-clamp-1  text-gray-800 dark:text-white">
              {song.title}
            </Text>
            <View className="mt-1 flex-row items-center">
              <MaterialCommunityIcons
                name="account"
                size={14}
                color={isDarkMode ? '#9CA3AF' : '#6B7280'}
              />
              <Text size="xs" variant="muted" className="ml-1">
                {song.metadata.author || 'Unknown'}
              </Text>
            </View>
            {song.metadata.composer && (
              <View className="mt-1 flex-row items-center">
                <MaterialCommunityIcons
                  name="music"
                  size={14}
                  color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                />
                <Text size="xs" variant="muted" className="ml-1">
                  {song.metadata.composer}
                </Text>
              </View>
            )}
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#6366f1" />
        </View>
      </TouchableOpacity>
    </Reanimated.View>
  );
};

type SearchBarProps = {
  onSearch: (query: string) => void;
  value: string;
};

const SearchBar = React.memo(({ onSearch, value }: SearchBarProps) => {
  const [searchValue, setValue] = useState(value);
  const inputRef = useRef<TextInput>(null);
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Reanimated.View className="z-10 mb-4 rounded-2xl p-3">
      <View className="mb-2 flex-row items-center">
        <Ionicons name="search-outline" size={24} color="#6366f1" />
        <Text size={'lg'} weight={'semibold'} className="ml-2 text-gray-800 dark:text-white">
          Find Your Song
        </Text>
      </View>
      <View className="flex-row items-center gap-x-2">
        <View className="w-full flex-1 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
          <View className="flex-row items-center px-3">
            <MaterialCommunityIcons name="music-note" size={24} color="#6366f1" />
            <TextInput
              ref={inputRef}
              placeholder="Search by title, author, composer, or song number"
              className="flex-1 items-center p-4 align-middle text-base  dark:text-white"
              placeholderClassName="text-xl"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#9ca3af'}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={value}
              value={searchValue}
              onChangeText={(text) => setValue(text)}
              onSubmitEditing={() => onSearch(searchValue)}
            />
          </View>
        </View>
        <TouchableOpacity
          className="w-auto items-center justify-center rounded-xl bg-indigo-600 p-4 shadow-sm"
          onPress={() => onSearch(searchValue)}>
          <Ionicons
            name="search"
            size={24}
            color={isDarkMode ? colors.gray[200] : colors.gray[50]}
          />
        </TouchableOpacity>
      </View>
    </Reanimated.View>
  );
});
