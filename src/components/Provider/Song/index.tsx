import React, { useState, useEffect } from 'react';
import { SongT } from '~/src/types/song';
import { SongContextT } from '~/src/types/song/SongContext';
import { SongContext } from '~/src/context/SongContext';
import { useQuery } from '@tanstack/react-query';
import { getSongs } from '~/src/services/song/getSongs';
import { logger } from '~/src/utils/logger';

type SongProviderProps = {
  children: React.ReactNode;
};

export const SongProvider = ({ children }: SongProviderProps) => {
  const [songs, setSongs] = useState<SongT[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [songIndex, setSongIndex] = useState<number>(0);

  const { data } = useQuery<SongT[]>({
    queryKey: ['songs'],
    queryFn: () => getSongs(0),
  });

  const currentSong = songs[songIndex] || null;
  const isNotFound = !currentSong;
  const isLastSong = songIndex === songs.length - 1;

  const ChangeSong = (songNo: number) => {
    const index = songs?.findIndex((song) => song.metadata.number === songNo);
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

  useEffect(() => {
    if (data && isInitialLoading) {
      logger.log('SongProvider useEffect');
      setSongs(data.sort((a, b) => a.metadata.number - b.metadata.number));
      setIsInitialLoading(false);
    }
  }, [data, isInitialLoading]);

  const value: SongContextT = {
    songs: data,
    song: currentSong,
    ChangeSong,
    currentSongIndex: songIndex,
    isLastSong,
    isNotFound,
    onNextSong,
    onPreviousSong,
  };

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};
