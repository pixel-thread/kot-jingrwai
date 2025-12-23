import { AppUpdateT } from './AppVersion';

export interface UpdateContextI {
  update: AppUpdateT | null | undefined;
  isUpdateAvailable: boolean;
  isUpdateLoading: boolean;
  refresh: () => void;
  currentAppVersion: string;
  dismiss: () => void;
  isShowUpdateDialog: boolean;
}
