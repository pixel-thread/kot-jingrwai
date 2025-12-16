import { SongT } from '../song';

export type KhorusParagraph = {
  id: string; // unique id for each paragraph
  order: number; // display order
  lines: string[]; // lines of lyrics
  type?: 'verse' | 'chorus' | 'bridge' | 'intro' | 'outro'; // optional label
  songId?: string;
};

export type KhorusMetadata = {
  number: number; // song number/index
  oldNumber?: number;
  language: string; // e.g. 'en', 'kn', 'khasi'
  author?: string;
  composer?: string;
  createdAt?: string; // ISO date
  tags?: string[]; // optional categories/tags
  songId?: string;
  syllables?: string;
  reference?: string;
  tune?: string;
  meter?: string;
};

export type KhorusT = {
  id: string;
  title: string;
  metadata: KhorusMetadata;
  paragraphs: KhorusParagraph[];
};

export type KhorusContextT = {
  khorus: SongT;
  isNotFound: boolean;
  onNextKhorus: () => void;
  currentKhorusIndex: number;
  isLastKhorus: boolean;
  onPreviousKhorus: () => void;
  ChangeKhorus: (khorusNo: number) => void;
};
