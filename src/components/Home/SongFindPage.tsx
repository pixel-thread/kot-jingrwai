import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { TextInput, View, ScrollView, TouchableOpacity, Animated, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { SongList } from '~/src/components/Home/SongList';
import { useSongs } from '~/src/hooks/song/useSongs';
import { songs } from '~/src/libs/songs';
import { Container } from '~/src/components/Common/Container';
import { Text } from '~/src/components/ui/typography';
import { useSongStore } from '~/src/libs/stores/songs';
import { cn } from '~/src/libs/cn';

import { Ternary } from '../Common/Ternary';
import { QuoteOfTheDay } from '../Common/QuoteOfTheDay';
import { ContentSection } from '../Common/ContentSection';
import { FeaturedSongCard } from './FeaturedSongCard';
import { FlashList } from '@shopify/flash-list';

export const SongFinderPage = () => {
  const { recentlyPlayedSongs: recentSongs, favoriteSongs: fav } = useSongStore();
  const [songNumber, setSongNumber] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'recent' | 'favorites'>('recent');
  const { ChangeSong } = useSongs();
  const router = useRouter();
  // Animation values
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
    Animated.parallel([]).start();

    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <Container className="dark:bg-gray-950">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="w-full flex-1"
        showsVerticalScrollIndicator={false}>
        {/* Hero Header */}
        <Animated.View
          // style={{ opacity: headerOpacity }}
          className="w-full items-center justify-center rounded-b-3xl bg-gradient-to-r from-indigo-600 to-purple-600 pb-8 pt-6 shadow-lg">
          <Reanimated.View entering={FadeInDown.delay(300).duration(800)}>
            <Text size={'3xl'} weight={'extrabold'} className="mb-2 uppercase">
              Jingrwai
            </Text>
          </Reanimated.View>
          <Reanimated.View entering={FadeInDown.delay(600).duration(800)}>
            <Text size={'base'} italic variant={'default'} className="text-center opacity-80">
              Ngan rwai da la ka dohnud
            </Text>
            <Text size={'base'} variant={'default'} italic className="text-center opacity-80">
              Ngan rwai da la ka jingshemphang ruh de
            </Text>
            <Text
              size={'base'}
              italic
              weight={'normal'}
              align={'right'}
              className="pr-2 opacity-80">
              - Paul
            </Text>
          </Reanimated.View>
        </Animated.View>
        {/* Main Content */}
        <View className="mt-6 px-4">
          <Reanimated.View
            className="mb-6 rounded-2xl bg-gray-100/70 p-5 shadow-xl dark:bg-gray-800"
            style={{
              shadowColor: '#6366f1',
              shadowOffset: { width: 0, height: 4 },
              // shadowOpacity: 0.3,
              shadowRadius: 8,
            }}>
            <View className="mb-4 flex-row items-center">
              <MaterialCommunityIcons name="music" size={24} color="#6366f1" />
              <Text size={'lg'} weight={'semibold'} className="ml-2 text-gray-800 dark:text-white">
                Wad da number jingrwai
              </Text>
            </View>

            <View className="mb-3 flex-col items-center gap-y-3">
              <View className="w-full flex-row items-center overflow-hidden rounded-xl border border-secondary-foreground bg-gray-200 px-3 dark:border-gray-600 dark:bg-gray-700">
                <Ionicons name="search-outline" size={24} color="#6366f1" />
                <TextInput
                  value={songNumber}
                  onChangeText={(text) => {
                    setSongNumber(text);
                    setError('');
                  }}
                  placeholder="Number jingrwai"
                  placeholderTextColor={'#9CA3AF'}
                  keyboardType="numeric"
                  className={cn('flex-1 p-4 text-xl dark:text-white', error && 'border-red-500')}
                  onSubmitEditing={handleSongSearch}
                />
              </View>

              {error ? (
                <Reanimated.Text
                  entering={FadeIn.duration(300)}
                  className="ml-1 self-start text-sm lowercase text-red-500 dark:text-red-400">
                  {error}
                </Reanimated.Text>
              ) : null}

              <TouchableOpacity
                disabled={!songNumber}
                className="w-full items-center justify-center rounded-xl bg-indigo-600 p-4 shadow-sm disabled:opacity-50"
                onPress={() => handleSongSearch()}>
                <Text size={'lg'} weight={'bold'} className="uppercase text-white dark:text-white">
                  Wad
                </Text>
              </TouchableOpacity>
            </View>
          </Reanimated.View>

          <QuoteOfTheDay />
          {/* Featured Section */}
          <Reanimated.View entering={FadeInUp.delay(500).duration(800)} className="my-6">
            <Text size={'xl'} weight={'bold'} className="mb-4 text-gray-800 dark:text-white">
              Featured Songs
            </Text>

            <View className="gap-4 gap-x-2">
              <FlashList
                horizontal
                data={songs.slice(0, 5)}
                showsHorizontalScrollIndicator={false}
                estimatedItemSize={20}
                ItemSeparatorComponent={() => <View className="w-2 bg-transparent" />}
                renderItem={({ item }) => <FeaturedSongCard song={item} />}
              />
            </View>
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
