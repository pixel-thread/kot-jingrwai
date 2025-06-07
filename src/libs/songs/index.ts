import { SongT } from '~/src/types/song';
import { shaphangUBlei } from './shaphang_u_blei';
import { shaphangUKhrist } from './shaphang_u_khrist';
import { shaphangUMynsiemBakhuid } from './shaphang_u_mynsiem_bakhuid';
import { shaphangKaKtienUBlei } from './shaphang_ka_ktien_u_blei';
import { shaphangKaBalang } from './shaphang_ka_balang';

export const songs: SongT[] = [...shaphangUBlei, ...shaphangUKhrist, ...shaphangUMynsiemBakhuid, ...shaphangKaKtienUBlei,...shaphangKaBalang];
