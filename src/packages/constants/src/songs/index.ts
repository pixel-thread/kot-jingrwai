import { shaphangUBlei } from "./shaphang_u_blei";
import { shaphangUKhrist } from "./shaphang_u_khrist";
import { shaphangUMynsiemBakhuid } from "./shaphang_u_mynsiem_bakhuid";
import { shaphangKaKtienUBlei } from "./shaphang_ka_ktien_u_blei";
import { shaphangKaBalang } from "./shaphang_ka_balang";
import { shaphangKaKamUBlei } from "./shaphang_ka_kam_u_blei";
import { shaphangKaJinglongJingimKhristan } from "./shaphang_ka_jinglong_jingim_khristan";
import { shaphangKaJingiapKibaNgeit } from "./shaphang_ka_jingiap_kiba_ngeit";
import { kaSnemBadKiAiom } from "./ka_snem_bad_ki_aiom";
import { kaJingaiShaKaKamUBlei } from "./ka_jingai_sha_ka_kam_u_blei";
import { kiJingrwaiShaphangKiIngKhristan } from "./ki_jingrwai_shaphang_ki_ing_khristan";
import { kiJingrwaiIalap } from "./ki_jingrwai_ialap";
import { kaJingiaroh } from "./ka_jingiaroh";
import { kaJingrwaiShaphangKaRi } from "./ka_jingrwai_shaphang_ka_ri";
import { kaJingrwaiRevival } from "./ka_jingrwai_revival";
import { kiJingrwaiIaKiKhynnah } from "./ki_jingrwai_ia_ki_khynnah";
import { kiJingrwaiIaKiSamla } from "./ki_jingrwai_ia_ki_samla";
import { kiJingrwaiPynwai } from "./ki_jingrwai_pynwai";

export type Line = {
  id?: string;
  order: number;
  text: string;
};

export type SongParagraph = {
  id?: string; // unique id for each paragraph
  order: number; // display order
  lines: string[]; // lines of lyrics
  type?: "INTRO" | "OUTRO" | "VERSE" | "CHORUS";
  songId?: string;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
};

export type SongMetadata = {
  id?: string;
  number: number; // song number/index
  oldNumber?: number | null;
  isChorus?: boolean;
  language: string; // e.g. 'en', 'kn', 'khasi'
  author?: string;
  composer?: string;
  tags?: string[]; // optional categories/tags
  songId?: string | null;
  syllables?: string | null;
  reference?: string | null;
  tune?: string | null;
  meter?: string | null;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
};

export type SongT = {
  id?: string;
  title: string;
  metadata: SongMetadata;
  paragraphs: SongParagraph[];
  isChorus?: boolean;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
  trackId?: string | null;
  track?: null;
  metadataId?: string | null;
};

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
  ...kiJingrwaiIaKiKhynnah,
  ...kiJingrwaiIaKiSamla,
  ...kiJingrwaiPynwai,
].sort((a, b) => a.metadata.number - b.metadata.number);

//TODO: 248,
//TODO: Some songs had same id which is causing error
