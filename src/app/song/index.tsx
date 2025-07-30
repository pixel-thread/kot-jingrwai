import { useSongs } from '~/src/hooks/song/useSongs';
import { LyricView } from '~/src/components/Lyric/LyricView';
import { Container } from '~/src/components/Common/Container';

export default function Song() {
  const { song } = useSongs();

  return (
    <Container>
      <LyricView song={song} />
    </Container>
  );
}
