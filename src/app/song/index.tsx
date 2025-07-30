import { useSongs } from '~/src/hooks/song/useSongs';
import { LyricView } from '~/src/components/Lyric/LyricView';

export default function Song() {
  const { song } = useSongs();

  return <LyricView song={song} />;
}
