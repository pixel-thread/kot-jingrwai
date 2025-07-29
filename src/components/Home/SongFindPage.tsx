import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { TextInput, View, ScrollView, TouchableOpacity, Animated, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { SongList } from '~/src/components/Home/SongList';
import { useSongs } from '~/src/hooks/song/useSongs';
import { songs } from '~/src/libs/songs';
import { Button } from '../ui/button';
import { Container } from '~/src/components/Common/Container';
import { Text } from '~/src/components/ui/typography';
import { useSongStore } from '~/src/libs/stores/songs';
import { cn } from '~/src/libs/cn';
import { useColorScheme } from 'nativewind';

import { Ternary } from '../Common/Ternary';

export const SongFinderPage = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { recentlyPlayedSongs: recentSongs, favoriteSongs: fav } = useSongStore();
  const [songNumber, setSongNumber] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'recent' | 'favorites'>('recent');
  const { ChangeSong } = useSongs();
  const router = useRouter();
  // Animation values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const searchBarTranslateY = useRef(new Animated.Value(50)).current;
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  // Get all available song numbers for validation
  const availableSongNumbers = songs.map((song) => song.metadata.number);

  const handleSongSearch = () => {
    const number = parseInt(songNumber);

    if (isNaN(number)) {
      setError('Please enter a valid number');
      return;
    }

    if (!availableSongNumbers.includes(number)) {
      setError(`Song number ${number} not found`);
      return;
    }

    setError('');
    ChangeSong(number);
    router.push('/song');
  };

  // Run animations on component mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(searchBarTranslateY, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Container className="dark:bg-gray-950">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="w-full flex-1"
        showsVerticalScrollIndicator={false}>
        {/* Hero Header */}
        <Animated.View
          style={{ opacity: headerOpacity }}
          className="w-full items-center justify-center rounded-b-3xl bg-gradient-to-r from-indigo-600 to-purple-600 pb-8 pt-6 shadow-lg">
          <Reanimated.View entering={FadeInDown.delay(300).duration(800)}>
            <Text size={'3xl'} weight={'extrabold'} className="mb-2 uppercase">
              Jingrwai
            </Text>
          </Reanimated.View>
          <Reanimated.View entering={FadeInDown.delay(600).duration(800)}>
            <Text size={'base'} className="text-center opacity-80">
              Wad da number jingrwai
            </Text>
          </Reanimated.View>
        </Animated.View>

        {/* Main Content */}
        <View className="-mt-6 px-4">
          <Reanimated.View
            entering={SlideInDown.delay(300).springify()}
            className="mb-6 rounded-2xl bg-white p-5 shadow-xl dark:bg-gray-800"
            style={[
              Platform.OS === 'ios'
                ? {
                    shadowColor: '#6366f1',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                  }
                : {},
            ]}>
            <View className="mb-4 flex-row items-center">
              <Ionicons name="search-outline" size={24} color="#6366f1" />
              <Text size={'lg'} weight={'semibold'} className="ml-2 text-gray-800 dark:text-white">
                Wad da number jingrwai
              </Text>
            </View>

            <View className="mb-3 flex-col items-center gap-y-3">
              <View className="w-full flex-row items-center overflow-hidden rounded-xl bg-gray-100 px-3 dark:bg-gray-700">
                <MaterialCommunityIcons name="music-note" size={24} color="#6366f1" />
                <TextInput
                  value={songNumber}
                  onChangeText={(text) => {
                    setSongNumber(text);
                    setError('');
                  }}
                  placeholder="Ai i u Number jingrwai"
                  placeholderTextColor={'#9CA3AF'}
                  keyboardType="numeric"
                  className={cn('flex-1 p-4 text-xl dark:text-white', error && 'border-red-500')}
                  onSubmitEditing={handleSongSearch}
                />
              </View>

              {error ? (
                <Reanimated.Text
                  entering={FadeIn.duration(300)}
                  className="ml-1 self-start text-red-500 dark:text-red-400">
                  {error}
                </Reanimated.Text>
              ) : null}

              <TouchableOpacity
                className="w-full items-center justify-center rounded-xl bg-indigo-600 p-4 shadow-sm"
                onPress={() => handleSongSearch()}>
                <Text size={'lg'} weight={'bold'} className="uppercase text-white dark:text-white">
                  Wad
                </Text>
              </TouchableOpacity>
            </View>
          </Reanimated.View>
          {/* Featured Section */}
          <Reanimated.View entering={FadeInUp.delay(500).duration(800)} className="mb-6">
            <Text size={'xl'} weight={'bold'} className="mb-4 text-gray-800 dark:text-white">
              Featured Songs
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row gap-4 space-x-2"
              contentContainerStyle={{ paddingRight: 20 }}>
              {songs.slice(0, 10).map((song, index) => (
                <Reanimated.View
                  key={song.id}
                  entering={FadeInUp.delay(600 + index * 100).duration(800)}
                  className={'gap-4 space-x-4'}
                  style={animatedCardStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      ChangeSong(song.metadata.number);
                      router.push('/song');
                    }}
                    className="mx-1 w-[160px] overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
                    style={
                      Platform.OS === 'ios'
                        ? {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                          }
                        : {}
                    }>
                    <View className="h-[100px] items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                      <Text size={'xl'}>{song.metadata.number}</Text>
                    </View>
                    <View className="p-3">
                      <Text
                        weight={'semibold'}
                        numberOfLines={1}
                        className="text-gray-800 dark:text-white">
                        {song.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Reanimated.View>
              ))}
            </ScrollView>
          </Reanimated.View>

          {/* Tabs for Recent and Favorites */}
          <Reanimated.View entering={FadeInUp.delay(700).duration(800)} className="mb-6">
            <View className="mb-4 flex-row rounded-full bg-gray-100 p-1 dark:bg-gray-800">
              <TouchableOpacity
                onPress={() => setActiveTab('recent')}
                className={cn(
                  'flex-1 items-center rounded-full py-2',
                  activeTab === 'recent' ? 'bg-indigo-600' : 'bg-transparent'
                )}>
                <Text
                  weight={'medium'}
                  className={
                    activeTab === 'recent' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                  }>
                  Recent
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab('favorites')}
                className={cn(
                  'flex-1 items-center rounded-full py-2',
                  activeTab === 'favorites' ? 'bg-indigo-600' : 'bg-transparent'
                )}>
                <Text
                  weight={'medium'}
                  className={
                    activeTab === 'favorites' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                  }>
                  Favorites
                </Text>
              </TouchableOpacity>
            </View>
            <Ternary
              condition={activeTab === 'recent'}
              ifTrue={
                <Reanimated.View entering={FadeIn.duration(300)}>
                  <SongList
                    title="Recently Viewed"
                    songNumbers={recentSongs}
                    emptyMessage="No viewed songs yet"
                  />
                </Reanimated.View>
              }
              ifFalse={
                <Reanimated.View entering={FadeIn.duration(300)}>
                  <SongList
                    title="Your Favorites"
                    songNumbers={fav}
                    emptyMessage="No favorite songs yet"
                  />
                </Reanimated.View>
              }
            />
          </Reanimated.View>
        </View>
      </ScrollView>
    </Container>
  );
};
