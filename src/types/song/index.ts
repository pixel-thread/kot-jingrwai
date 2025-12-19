export type Line = {
  id: string;
  order: number;
  text: string;
  createdAt?: string;
  updatedAt?: string;
  paragraphId: string;
};
type VerseType = 'VERSE' | 'CHORUS' | 'BRIDGE' | 'INTRO' | 'OUTRO'; // optional label

export type SongParagraph = {
  id: string; // unique id for each paragraph
  order: number; // display order
  lines: Line[]; // lines of lyrics
  type?: VerseType;
  songId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SongMetadata = {
  id: string;
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

export type TrackMetadata = {
  id: string;
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

export type Track = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  metadataId: string;
  metadata: TrackMetadata;
};

export type SongT = {
  id: string;
  title: string;
  metadata: SongMetadata;
  paragraphs: SongParagraph[];
  createdAt?: string;
  updatedAt?: string;
  metadataId: string;
  trackId?: string | null;
  track: Track | null;
};

export type JoinedSongRow = {
  lines: {
    id: string;
    order: number;
    paragraphId: string | null;
    text: string;
    updatedAt: number;
  } | null;
  paragraphs: {
    id: string;
    order: number;
    songId: string;
    type: 'VERSE' | 'CHORUS' | 'BRIDGE' | 'INTRO' | 'OUTRO' | null;
    updatedAt: number;
  } | null;
  songMetadata: {
    id: string;
    number: number;
    oldNumber: number | null;
    language: string;
    author: string | null; // ← Allow null
    composer: string | null; // ← Allow null
    isChorus: boolean | null;
    tags: string | null; // ← Allow null
    syllables: string | null; // ← Allow null
    reference: string | null;
    tune: string | null;
    meter: string | null;
    updatedAt: number;
  } | null;
  songs: {
    id: string;
    metadataId: string;
    title: string;
    trackId: string | null;
    updatedAt: number;
  };
};
