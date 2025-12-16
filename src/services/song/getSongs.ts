import { songs } from '~/src/libs/songs';

type Props = {
  isChorus?: boolean;
  isAll?: boolean;
};

export async function getSongs({ isChorus = false, isAll }: Props) {
  if (isAll) {
    return songs;
  }
  return songs.filter((song) => song.metadata.isChorus === isChorus);
}
