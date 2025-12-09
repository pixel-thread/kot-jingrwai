type DetailsT = {
  id: string;
  text: string;
  reference: string;
  version: string;
  verseurl: string;
  createdAt: string;
  updatedAt: string;
};

type VerseT = {
  id: string;
  verse: {
    id: string;
    details: DetailsT;
    notice: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};
