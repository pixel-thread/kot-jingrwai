export type SongParagraph = {
  id: string; // unique id for each paragraph
  order: number; // display order
  lines: string[]; // lines of lyrics
  type?: 'verse' | 'chorus' | 'bridge' | 'intro' | 'outro'; // optional label
  songId?: string;
};

export type SongMetadata = {
  number: number; // song number/index
  oldNumber?: number;
  language: string; // e.g. 'en', 'kn', 'khasi'
  author?: string;
  composer?: string;
  createdAt?: string; // ISO date
  tags?: string[]; // optional categories/tags
  songId?: string;
  syllables?: string;
};

export type SongT = {
  id: string;
  title: string;
  metadata: SongMetadata;
  paragraphs: SongParagraph[];
};
