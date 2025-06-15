import { useSongs } from '~/src/hooks/song/useSongs';
import { Container } from '~/src/components/Common/Container';
import { LyricView } from '~/src/components/Lyric/LyricView';

export default function Song() {
  const { song } = useSongs();

  return (
    <Container>
      <LyricView song={song} />
    </Container>
  );
}
