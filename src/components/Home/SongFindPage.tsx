import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TextInput, View, ScrollView } from 'react-native';

import { SongList } from '~/src/components/Home/SongList';
import { useSongs } from '~/src/hooks/song/useSongs';
import { songs } from '~/src/libs/songs';
import { Button } from '../ui/button';
import { Container } from '~/src/components/Common/Container';
import { Text } from '~/src/components/ui/typography';
import { useSongStore } from '~/src/libs/stores/songs';
import { cn } from '~/src/libs/cn';

export const SongFinderPage = () => {
  const { recentlyPlayedSongs: recentSongs, favoriteSongs: fav } = useSongStore();
  const [songNumber, setSongNumber] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { ChangeSong } = useSongs();
  const router = useRouter();

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

  return (
    <Container className="dark:bg-gray-950">
      <ScrollView keyboardShouldPersistTaps="handled" className="w-full flex-1 p-4">
        {/* Song Finder */}
        <View className="mb-8">
          <View className="mb-4 items-center">
            <Text size={'2xl'} weight={'extrabold'} className="mb-2 uppercase">
              Jingrwai
            </Text>
            <Text size={'base'} variant={'secondary'} className="text-center">
              Wad da number jingrwai
            </Text>
          </View>

          <View className="mb-2 flex-col items-center gap-y-2">
            <TextInput
              value={songNumber}
              onChangeText={(text) => {
                setSongNumber(text);
                setError('');
              }}
              placeholder="Ai i u Number jingrwai"
              placeholderTextColor={'#9CA3AF'}
              keyboardType="numeric"
              className={cn(
                'w-full flex-1 rounded-lg border border-gray-300 p-3 align-middle text-xl dark:border-gray-800 dark:text-white',
                error && 'border-red-500'
              )}
            />
            {error ? <Text className="ml-1 text-red-500 dark:text-red-400">{error}</Text> : null}
            <Button
              title="WAD"
              disabled={songNumber === ''}
              onPress={handleSongSearch}
              className="w-full px-6 disabled:opacity-50 disabled:shadow-none"
            />
          </View>
        </View>
        {/* Recent Songs */}
        <SongList title="Viewed" songNumbers={recentSongs} emptyMessage="No viewed songs" />
        {/* Favorite Songs */}
        <SongList title="Marked Songs" songNumbers={fav} emptyMessage="No Marked songs yet" />
      </ScrollView>
    </Container>
  );
};
