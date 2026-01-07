import { SongT } from "@repo/types";

const songs = [] as SongT[];

type Props = {
  isChorus?: boolean;
  isAll?: boolean;
};

export const SongServices = {
  getSongs({ isChorus = false, isAll = false }: Props): SongT[] {
    if (isAll) {
      return songs;
    }
    return songs.filter((song) => song.metadata.isChorus === isChorus);
  },

  getFeaturedSongs(): SongT[] {
    return [];
  },

  getUniqueSongs({ id }: { id: string }): SongT | undefined {
    return songs.find((song) => song.id === id);
  },
};
