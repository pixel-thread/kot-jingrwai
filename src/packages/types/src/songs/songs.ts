export type VerseT = "VERSE" | "CHORUS" | "BRIDGE" | "INTRO" | "OUTRO";

export type LineT = {
  id?: string;
  order: number;
  text: string;
  createdAt?: string;
  updatedAt?: string;
  paragraphId: string;
};

export type SongParagraphT = {
  id?: string; // unique id for each paragraph
  order: number; // display order
  lines: LineT[] | string[]; // lines of lyrics
  type?: VerseT;
  songId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SongMetadataT = {
  id?: string;
  number: number; // song number/index
  oldNumber?: number | null;
  language: string; // e.g. 'en', 'kn', 'khasi'
  author?: string | null;
  composer?: string | null;
  isChorus?: boolean;
  tags?: string[]; // optional categories/tags
  songId?: string | null;
  syllables?: string | null;
  reference?: string | null;
  tune?: string | null;
  meter?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type TrackMetadataT = {
  id?: string;
  supabaseId: string;
  path: string;
  fileName: string;
  downloadUrl: string;
  fullPath: string;
  mimeType: string;
  fileSize: number;
  createdAt?: string;
  updatedAt?: string;
  trackId?: string | null;
};

export type TrackT = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  metadataId: string;
  metadata: TrackMetadataT;
};

export type SongT = {
  id?: string;
  title: string;
  metadata: SongMetadataT;
  paragraphs: SongParagraphT[];
  createdAt?: string;
  updatedAt?: string;
  metadataId?: string;
  trackId?: string | null;
  track?: TrackT | null;
};
