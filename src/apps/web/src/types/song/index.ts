import { $Enums } from "@/lib/database/prisma/generated/prisma";
export type Line = {
  id?: string;
  order: number;
  text: string;
};

export type SongParagraph = {
  id?: string; // unique id for each paragraph
  order: number; // display order
  lines: string[]; // lines of lyrics
  type?: $Enums.VerseType;
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
