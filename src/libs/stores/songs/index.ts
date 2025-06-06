import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SongT } from '~/src/types/song';

type UseSongStoreT = {
  favoriteSongs: number[];
  addFavoriteSong: (song: number) => void;
  removeFavoriteSong: (songNo: number) => void;

  recentlyPlayedSongs: number[];
  addRecentlyPlayedSong: (songNo: SongT) => void;
};

const MAX_RECENTLY_VIEWS = 10;

export const useSongStore = create<UseSongStoreT>()(
  persist(
    (set, get) => ({
      favoriteSongs: [],
      addFavoriteSong: (song) => {
        const current = get().favoriteSongs;
        const num = song;
        if (!current.includes(num)) {
          set({ favoriteSongs: [...current, num] });
        }
      },

      removeFavoriteSong: (song) => {
        const num = song;
        set({
          favoriteSongs: get().favoriteSongs.filter((n) => n !== num),
        });
      },

      recentlyPlayedSongs: [],
      addRecentlyPlayedSong: (song) => {
        const num = song.metadata.number;
        const existing = get().recentlyPlayedSongs.filter((n) => n !== num);
        const updated = [num, ...existing].slice(0, MAX_RECENTLY_VIEWS);
        set({ recentlyPlayedSongs: updated });
      },
    }),
    {
      name: 'song-storage',
      getStorage: () => AsyncStorage,
    }
  )
);
