import { SongT } from '.';

export type SongContextT = {
  song: SongT;
  isNotFound: boolean;
  onNextSong: () => void;
  currentSongIndex: number;
  isLastSong: boolean;
  onPreviousSong: () => void;
  ChangeSong: (songNo: number) => void;
};
