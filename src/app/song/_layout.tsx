import { Stack } from 'expo-router';
import { useSongs } from '~/src/hooks/song/useSongs';
import { SongNavigation } from '~/src/components/Lyric/SongNavigation';

export default function Layout() {
  const { song, onNextSong, onPreviousSong } = useSongs();
  return (
    <>
      <Stack
        screenOptions={{
          headerTitle: song.metadata.number.toString(),
          headerShown: false,
          title: song.metadata.number.toString(),
          contentStyle: { backgroundColor: 'transparent', paddingBottom: 80 },
          headerBackButtonMenuEnabled: true,
        }}>
        <Stack.Screen name="index" />
      </Stack>
      <SongNavigation
        onNext={onNextSong}
        onPrevious={onPreviousSong}
        songNumber={song.metadata.number}
      />
    </>
  );
}
