import { useState } from 'react';
import { SongContext } from '~/src/context/SongContext';
import { songs } from '~/src/libs/songs';
import { SongContextT } from '~/src/types/song/SongContext';

type SongProviderProps = {
  children: React.ReactNode;
};

export const SongProvider = ({ children }: SongProviderProps) => {
  const [songIndex, setSongIndex] = useState<number>(0);

  const currentSong = songs[songIndex] || null;
  const isNotFound = !currentSong;
  const isLastSong = songIndex === songs.length - 1;

  const ChangeSong = (songNo: number) => {
    const index = songs.findIndex((song) => song.metadata.number === songNo);
    if (index !== -1) {
      setSongIndex(index);
    }
  };

  const onNextSong = () => {
    if (songIndex < songs.length - 1) {
      setSongIndex((prev) => prev + 1);
    }
  };

  const onPreviousSong = () => {
    if (songIndex > 0) {
      setSongIndex((prev) => prev - 1);
    }
  };

  const value: SongContextT = {
    song: currentSong,
    ChangeSong: ChangeSong,
    currentSongIndex: songIndex,
    isLastSong,
    isNotFound,
    onNextSong,
    onPreviousSong,
  };

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};
