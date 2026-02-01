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
  paidbah?: string;
  nongialam?: string;
  items?: KiJingDuwaiItemsT[];
};

export type KiJingUDwaiT = {
  id: string;
  title: string;
  items: KiJingDuwaiItemsT[];
};
