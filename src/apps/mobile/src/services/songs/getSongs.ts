import { songs } from "~/src/libs/songs";

type Props = {
  isChorus?: boolean;
  isAll?: boolean;
};

export function getSongs({ isChorus = false, isAll = false }: Props) {
  let data;

  if (isAll) {
    data = { data: songs };
  }

  if (isChorus) {
    const filterdSongs = songs.filter((song) => song.metadata.isChorus === isChorus);
    data = { data: filterdSongs };
  }

  return data;
}
