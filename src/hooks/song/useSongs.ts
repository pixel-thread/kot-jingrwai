import React from 'react';
import { SongContext } from '~/src/context/SongContext';

export function useSongs() {
  const context = React.useContext(SongContext);
  if (!context) {
    throw new Error('useSongs must be used within a SongProvider');
  }
  return context;
}
