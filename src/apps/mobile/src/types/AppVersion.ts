export type AppUpdateType = 'PTA' | 'OTA';

export type AppUpdateStatus = 'ACTIVE' | 'INACTIVE' | 'DEPRECATED';

export type AppUpdatePlatform = 'ANDROID' | 'IOS';

export type AppUpdateTag = 'BETA' | 'STABLE' | 'PATCH';

export interface AppUpdateT {
  id: string;
  version: string;
  title: string;
  description: string[];
  type: AppUpdateType;
  platforms: AppUpdatePlatform[];
  releaseNotesUrl: string | null;
  downloadUrl: string | null;
  releaseDate: string; // ISO string
  minSupportedVersion: string;
  author: string | null;
  tags: AppUpdateTag[];
  additionalInfo: unknown | null;
  status: AppUpdateStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
