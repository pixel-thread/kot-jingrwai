import { SongT } from '~/src/types/song';
import { shaphangUBlei } from './shaphang_u_blei';
import { shaphangUKhrist } from './shaphang_u_khrist';
import { shaphangUMynsiemBakhuid } from './shaphang_u_mynsiem_bakhuid';
import { shaphangKaKtienUBlei } from './shaphang_ka_ktien_u_blei';
import { shaphangKaBalang } from './shaphang_ka_balang';
import { shaphangKaKamUBlei } from './shaphang_ka_kam_u_blei';
import { shaphangKaJinglongJingimKhristan } from './shaphang_ka_jinglong_jingim_khristan';

export const songs: SongT[] = [...shaphangKaJinglongJingimKhristan, ...shaphangKaKamUBlei, ...shaphangUBlei, ...shaphangUKhrist, ...shaphangUMynsiemBakhuid, ...shaphangKaKtienUBlei,...shaphangKaBalang];


//TODO: 248,