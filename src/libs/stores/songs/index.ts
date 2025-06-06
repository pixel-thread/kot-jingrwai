import { create } from 'zustand';
import { SongT } from '~/src/types/song';

type UseSongStoreT = {
  song: SongT;
  setSong: (song: SongT) => void;
  currentSong: number;
  setCurrentSong: (song: number) => void;
};

export const useSongStore = create<UseSongStoreT>((set) => ({
  song: {} as SongT,
  setSong: (song: SongT) => set({ song }),
  currentSong: 1,
  setCurrentSong: (song: number) => set({ currentSong: song }),
}));
