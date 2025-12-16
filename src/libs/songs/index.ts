import { SongT } from '../../types/song';
import data from './song.json';

// @ts-ignore
export const songs: SongT[] = data || [];
