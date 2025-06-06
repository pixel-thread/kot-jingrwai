import { SongT } from '~/src/types/song';
import { shaphangUBlei } from './shaphang_u_blei';
import { shaphangUKhrist } from './shaphang_u_khrist';

export const songs: SongT[] = [...shaphangUBlei, ...shaphangUKhrist];
