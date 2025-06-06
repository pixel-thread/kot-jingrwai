import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Container } from '../Container';
import { songs } from '~/src/libs/songs';
import { useRouter } from 'expo-router';
import { useSongs } from '~/src/hooks/song/useSongs';
import { Text } from '~/src/components/ui/typography';

const FILTERS = [
  'All',
  'Song',
  'Lyrics',
  'Chords',
  'Music',
  'Video',
  'Podcast',
  'Blog',
  'News',
  'Interview',
  'Podcast',
  'News',
  'Interview',
  'Podcast',
  'News',
  'Interview',
];
export const AllSongPage = () => {
  const router = useRouter();
  const { ChangeSong } = useSongs();
  return (
    <Container>
      <ScrollView className="w-full flex-1 p-4">
        <View className="mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex flex-1 space-x-2"
            contentContainerStyle={{ paddingRight: 12, gap: 2 }}>
            {FILTERS.map((filter, i) => (
              <TouchableOpacity
                key={i}
                className="rounded-lg bg-gray-200 px-4 py-2"
                onPress={() => {
                  // handle filter press (logic can be added later)
                }}>
                <Text size={'sm'} variant={'secondary'}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View className="mb-6 flex-1 rounded-lg p-2">
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
                      <Text weight={'semibold'}>{song.metadata.number}</Text>
                    </View>
                    <View className="flex-1">
                      <Text size={'lg'} weight={'medium'}>
                        {song.title}
                      </Text>
                      <Text size={'sm'} variant={'muted'}>
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
