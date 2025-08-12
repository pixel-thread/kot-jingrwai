import { AppUpdateT } from './AppVersion';

export interface UpdateI {
  update: AppUpdateT | null | undefined;
  isUpdateAvailable: boolean;
  isUpdateLoading: boolean;
  refresh: () => void;
  dismiss: () => void;
  appVersion: string;
}
