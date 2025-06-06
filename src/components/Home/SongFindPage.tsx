import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TextInput, View, ScrollView, TouchableOpacity } from 'react-native';

import { QuoteOfTheDay } from '~/src/components/Home/QuoteOfTheDay';
import { SongList } from '~/src/components/Home/SongList';
import { useSongs } from '~/src/hooks/song/useSongs';
import { songs } from '~/src/libs/songs';
import { Button } from '../Button';
import { Container } from '../Container';
import { Text } from '~/src/components/ui/typography';

export const SongFinderPage = () => {
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
    <Container>
      <ScrollView className="w-full flex-1 p-4">
        {/* Song Finder */}
        <View className="mb-8">
          <View className="mb-4 items-center">
            <Text className="mb-2 text-2xl font-bold">Song Finder</Text>
            <Text className="text-center text-base text-gray-600">
              Enter a song number to view lyrics
            </Text>
          </View>

          <View className="mb-2 flex-row items-center">
            <TextInput
              value={songNumber}
              onChangeText={(text) => {
                setSongNumber(text);
                setError('');
              }}
              placeholder="Enter song number"
              keyboardType="numeric"
              className="flex-1 rounded-lg border border-gray-300 p-3 text-lg"
            />
            <Button title="Find" onPress={handleSongSearch} className="ml-2 px-6" />
          </View>

          {error ? <Text className="ml-1 text-red-500">{error}</Text> : null}
        </View>
        <QuoteOfTheDay />
        {/* Recent Songs */}
        <SongList
          title="Recently Viewed Songs"
          songNumbers={[]}
          emptyMessage="No recently viewed songs"
        />

        {/* Favorite Songs */}
        <SongList title="Favorite Songs" songNumbers={[]} emptyMessage="No favorite songs yet" />

        {/* All Songs */}
        <Text className="mb-2 text-lg font-semibold">All Songs:</Text>
        <View className="mb-6 flex-1 rounded-lg border border-gray-200 p-2">
          {songs
            .sort((a, b) => a.metadata.number - b.metadata.number)
            .map((song) => (
              <TouchableOpacity
                key={song.id}
                onPress={() => {
                  ChangeSong(song.metadata.number);
                  router.push('/song');
                }}
                className="border-b border-gray-100 px-2 py-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 flex-row items-center">
                    <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                      <Text className="font-semibold">{song.metadata.number}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-medium">{song.title}</Text>
                      <Text className="text-sm text-gray-500">
                        {`By: ${song.metadata.author ?? song.metadata.composer}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </Container>
  );
};
