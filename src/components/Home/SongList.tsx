import { View, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, { FadeInRight } from 'react-native-reanimated';
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
    router.push('/song');
  };

  return (
    <View className="mb-6">
      <Text size={'lg'} weight={'semibold'} className="mb-3 text-gray-800 dark:text-gray-200">
        {title}
      </Text>

      {filteredSongs.length > 0 ? (
        <View className="overflow-hidden rounded-xl">
          {filteredSongs.map((song, index) => (
            <Reanimated.View key={song.id} entering={FadeInRight.delay(index * 100).duration(400)}>
              <TouchableOpacity
                onPress={() => handleSongPress(song.metadata.number)}
                className="mb-2 flex-row items-center rounded-xl bg-white p-3 shadow-sm dark:bg-gray-800"
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
                <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Text size="lg" weight="bold">
                    {song.metadata.number}
                  </Text>
                </View>
                <View className="flex-1 border-l border-gray-100 pl-3 dark:border-gray-700">
                  <Text weight="semibold" className="line-clamp-1 text-gray-800 dark:text-white">
                    {song.title}
                  </Text>
                  {song.metadata.author && (
                    <View className="mt-1 flex-row items-center">
                      <MaterialCommunityIcons name="account" size={14} color="#9CA3AF" />
                      <Text variant="muted" size="xs" className="ml-1">
                        {song.metadata.author}
                      </Text>
                    </View>
                  )}
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#6366f1" />
              </TouchableOpacity>
            </Reanimated.View>
          ))}
        </View>
      ) : (
        <View
          className="items-center justify-center rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
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
          <MaterialCommunityIcons name="playlist-music" size={40} color="#9CA3AF" />
          <Text variant="muted" className="mt-2 text-center">
            {emptyMessage}
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/songs')}
            className="mt-3 rounded-full bg-indigo-100 px-4 py-2 dark:bg-indigo-900">
            <Text size="sm" className="text-indigo-600 dark:text-indigo-400">
              Browse Songs
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
