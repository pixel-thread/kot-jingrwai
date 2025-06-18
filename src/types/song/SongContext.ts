import { SongT } from '.';

export type SongContextT = {
  songs: SongT[];
  song: SongT;
  isNotFound: boolean;
  onNextSong: () => void;
  currentSongIndex: number;
  isLastSong: boolean;
  onPreviousSong: () => void;
  ChangeSong: (songNo: number) => void;
};
