import { SongT } from '~/src/types/song';
import { shaphangUBlei } from './shaphang_u_blei';
import { shaphangUKhrist } from './shaphang_u_khrist';
import { shaphangUMynsiemBakhuid } from './shaphang_u_mynsiem_bakhuid';
import { shaphangKaKtienUBlei } from './shaphang_ka_ktien_u_blei';
import { shaphangKaBalang } from './shaphang_ka_balang';
import { shaphangKaKamUBlei } from './shaphang_ka_kam_u_blei';
import { shaphangKaJinglongJingimKhristan } from './shaphang_ka_jinglong_jingim_khristan';
import { shaphangKaJingiapKibaNgeit } from './shaphang_ka_jingiap_kiba_ngeit';
import { kaSnemBadKiAiom } from './ka_snem_bad_ki_aiom';
import { kaJingaiShaKaKamUBlei } from './ka_jingai_sha_ka_kam_u_blei';
import { kiJingrwaiShaphangKiIngKhristan } from './ki_jingrwai_shaphang_ki_ing_khristan';
import { kiJingrwaiIalap } from './ki_jingrwai_ialap';
import { kaJingiaroh } from './ka_jingiaroh';
import { kaJingrwaiShaphangKaRi } from './ka_jingrwai_shaphang_ka_ri';
import { kaJingrwaiRevival } from './ka_jingrwai_revival';

export const songs: SongT[] = [
  ...kaSnemBadKiAiom,
  ...shaphangKaJingiapKibaNgeit,
  ...shaphangKaJinglongJingimKhristan,
  ...shaphangKaKamUBlei,
  ...shaphangUBlei,
  ...shaphangUKhrist,
  ...shaphangUMynsiemBakhuid,
  ...shaphangKaKtienUBlei,
  ...shaphangKaBalang,
  ...kaJingaiShaKaKamUBlei,
  ...kiJingrwaiShaphangKiIngKhristan,
  ...kiJingrwaiIalap,
  ...kaJingiaroh,
  ...kaJingrwaiShaphangKaRi,
  ...kaJingrwaiRevival,
].sort((a, b) => a.metadata.number - b.metadata.number);

//TODO: 248,
//TODO: Some songs had same id which is causing error
