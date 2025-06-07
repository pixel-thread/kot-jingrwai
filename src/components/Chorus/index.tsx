import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Container } from '../Container';
import { songs } from '~/src/libs/songs';
import { useRouter } from 'expo-router';
import { useSongs } from '~/src/hooks/song/useSongs';
import { Text } from '~/src/components/ui/typography';
import { SongT } from '~/src/types/song';

export const ChorusPage = () => {
  return (
    <Container>
      <ScrollView className="w-full flex-1 p-4">
        <FlatList
          data={songs}
          renderItem={({ item }) => <ChorusListItem song={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-px bg-gray-200 dark:bg-gray-800" />}
        />
      </ScrollView>
    </Container>
  );
};

const ChorusListItem = ({ song }: { song: SongT }) => {
  const router = useRouter();
  const { ChangeSong } = useSongs();
  return (
    <TouchableOpacity
      key={song.id}
      onPress={() => {
        ChangeSong(song.metadata.number);
        router.push('/song');
      }}
      className="border-b border-gray-200 px-2 py-3 dark:border-gray-800">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-indigo-200 p-1 dark:bg-indigo-800">
            <Text weight={'semibold'}>{song.metadata.number}</Text>
          </View>
          <View className="flex-1">
            <Text size={'lg'} weight={'medium'}>
              {song.title}
            </Text>
            <Text size={'sm'} variant={'muted'}>
              {`By: ${song.metadata.author ?? song.metadata.composer}`}
            </Text>
            <Text size={'sm'} variant={'muted'}>
              {`Composer: ${song.metadata.composer}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
