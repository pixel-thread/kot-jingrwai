import { SongT } from '.';

type OnNextPrev = {
  id: string;
};
export type SongContextT = {
  songs: SongT[] | null | undefined;
  onNextSong: ({ id }: OnNextPrev) => void;
  onPreviousSong: ({ id }: OnNextPrev) => void;
};
