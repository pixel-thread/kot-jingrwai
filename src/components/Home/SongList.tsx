import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSongs } from '~/src/hooks/song/useSongs';
import { songs } from '~/src/libs/songs';
import { Text } from '~/src/components/ui/typography';

type SongListProps = {
  title: string;
  songNumbers: number[];
  emptyMessage: string;
};

export const SongList = ({ title, songNumbers, emptyMessage }: SongListProps) => {
  const router = useRouter();
  const { ChangeSong } = useSongs();

  // Filter songs based on provided song numbers
  const filteredSongs = songs.filter((song) => songNumbers.includes(song.metadata.number));

  const handleSongPress = (songNumber: number) => {
    ChangeSong(songNumber);
    router.push(`song/${songNumber}` as any);
  };

  return (
    <View className="mb-6">
      <Text className="mb-2 text-lg font-semibold">{title}</Text>

      {filteredSongs.length > 0 ? (
        <View className="rounded-lg border border-gray-200">
          {filteredSongs.map((song) => (
            <TouchableOpacity
              key={song.id}
              onPress={() => handleSongPress(song.metadata.number)}
              className="flex-row items-center border-b border-gray-100 px-3 py-2">
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                <Text className="font-semibold">{song.metadata.number}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium">{song.title}</Text>
                {song.metadata.author && (
                  <Text className="text-xs text-gray-500">By: {song.metadata.author}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <Text className="text-center text-gray-500">{emptyMessage}</Text>
        </View>
      )}
    </View>
  );
};
