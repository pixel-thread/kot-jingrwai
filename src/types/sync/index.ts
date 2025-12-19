export interface SyncContextI {
  isSyncing: boolean;
  syncAll: () => void;
  sync: () => void;
}
