type PrayerLineT = {
  id: number;
  line: string;
  order: number[];
};

export type KiJingDuwaiItemsT = {
  id: string;
  title: string;
  desc: string;
  prayerLines?: PrayerLineT[];
  pTag?: string;
  nTag?: string;
  items?: KiJingDuwaiItemsT[];
};

export type KiJingUDwaiT = {
  id: string;
  title: string;
  items: KiJingDuwaiItemsT[];
};
