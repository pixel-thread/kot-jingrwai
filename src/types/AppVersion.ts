export type AppUpdateT = {
  id: string; // uuid or database id
  version: string;
  title: string;
  description: string[];
  downloadUrl: string;
  mandatory: boolean;
  platforms: string[];
  release_notes_url: string;
  release_date: string;
  min_supported_version: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  author: string;
  tags: string[];
  additional_info: AdditionalInfo;
};

export type AdditionalInfo = {
  estimated_downtime: string;
  rollback_available: boolean;
};
