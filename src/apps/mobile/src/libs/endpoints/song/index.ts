import { EndpointT } from '@repo/types';

type SongEnpoints = 'GET_SONGS' | 'GET_SONG_TRACK' | 'GET_SONG';

export const SONG_ENDPOINTS: EndpointT<SongEnpoints> = {
  GET_SONGS: '/songs',
  GET_SONG: '/songs/:id',
  GET_SONG_TRACK: '/songs/:id/track',
};
