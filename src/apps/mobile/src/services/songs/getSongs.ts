import { songs } from '~/src/libs/songs';

type Props = {
  isChorus?: boolean;
  isAll?: boolean;
};
export function getSongs({ isChorus = false, isAll = false }: Props) {
  if (isAll) {
    return songs;
  }
  return songs.filter((song) => song.metadata.isChorus === isChorus);
}
