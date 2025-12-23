type DetailsT = {
  text: string;
  reference: string;
  version: string;
  verseurl: string;
};

type Verse = {
  details: DetailsT;
  notice: string;
};

export type BibleVerseT = {
  verse: Verse;
};
