import { useSongs } from '~/src/hooks/song/useSongs';
import { Container } from '~/src/components/Container';
import { LyricView } from '~/src/components/Lyric/LyricView';

import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useSwipeGesture } from '~/src/hooks/useSwipeGesture';

export default function Song() {
  const { song, onNextSong, onPreviousSong } = useSongs();

  const gesture = useSwipeGesture({
    onSwipeLeft: onNextSong,
    onSwipeRight: onPreviousSong,
  });

  return (
    <GestureDetector gesture={gesture}>
      <View className="flex-1" collapsable={false}>
        <Container>
          <LyricView song={song} />
        </Container>
      </View>
    </GestureDetector>
  );
}
