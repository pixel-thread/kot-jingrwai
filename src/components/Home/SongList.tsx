import { View, TouchableOpacity } from 'react-native';
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
    router.push('/song');
  };

  return (
    <View className="mb-6 border border-gray-200 p-4 dark:border-gray-950">
      <Text size={'lg'} weight={'extrabold'} className="mb-2">
        {title}
      </Text>

      {filteredSongs.length > 0 ? (
        <View className="rounded-lg border border-gray-300 dark:border-gray-800">
          {filteredSongs.map((song) => (
            <TouchableOpacity
              key={song.id}
              onPress={() => handleSongPress(song.metadata.number)}
              className="flex-row items-center border-b border-gray-200 px-3 py-2 dark:border-gray-800">
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-indigo-200 dark:bg-indigo-800">
                <Text weight={'semibold'}>{song.metadata.number}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium">{song.title}</Text>
                {song.metadata.author && (
                  <Text variant={'muted'} size={'sm'}>
                    By: {song.metadata.author}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View className="rounded-lg border border-gray-200 bg-gray-200 p-4 dark:border-gray-800 dark:bg-gray-950">
          <Text variant={'muted'} className="text-center ">
            {emptyMessage}
          </Text>
        </View>
      )}
    </View>
  );
};
