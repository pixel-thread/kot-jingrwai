import { shaphangUBlei } from "./presbyterian/shaphang_u_blei";
import { shaphangUKhrist } from "./presbyterian/shaphang_u_khrist";
import { shaphangUMynsiemBakhuid } from "./presbyterian/shaphang_u_mynsiem_bakhuid";
import { shaphangKaKtienUBlei } from "./presbyterian/shaphang_ka_ktien_u_blei";
import { shaphangKaBalang } from "./presbyterian/shaphang_ka_balang";
import { shaphangKaKamUBlei } from "./presbyterian/shaphang_ka_kam_u_blei";
import { shaphangKaJinglongJingimKhristan } from "./presbyterian/shaphang_ka_jinglong_jingim_khristan";
import { shaphangKaJingiapKibaNgeit } from "./presbyterian/shaphang_ka_jingiap_kiba_ngeit";
import { kaSnemBadKiAiom } from "./presbyterian/ka_snem_bad_ki_aiom";
import { kaJingaiShaKaKamUBlei } from "./presbyterian/ka_jingai_sha_ka_kam_u_blei";
import { kiJingrwaiShaphangKiIngKhristan } from "./presbyterian/ki_jingrwai_shaphang_ki_ing_khristan";
import { kiJingrwaiIalap } from "./presbyterian/ki_jingrwai_ialap";
import { kaJingiaroh } from "./presbyterian/ka_jingiaroh";
import { kaJingrwaiShaphangKaRi } from "./presbyterian/ka_jingrwai_shaphang_ka_ri";
import { kaJingrwaiRevival } from "./presbyterian/ka_jingrwai_revival";
import { kiJingrwaiIaKiKhynnah } from "./presbyterian/ki_jingrwai_ia_ki_khynnah";
import { kiJingrwaiIaKiSamla } from "./presbyterian/ki_jingrwai_ia_ki_samla";
import { kiJingrwaiPynwai } from "./presbyterian/ki_jingrwai_pynwai";

export const songs = [
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
  ...kiJingrwaiIaKiKhynnah,
  ...kiJingrwaiIaKiSamla,
  ...kiJingrwaiPynwai,
].sort((a, b) => a.metadata.number - b.metadata.number);
