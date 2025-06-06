import React from 'react';
import { SongContextT } from '~/src/types/song/SongContext';

export const SongContext = React.createContext<SongContextT | null>(null);
