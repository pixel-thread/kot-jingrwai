import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { UpdateContext } from '~/src/context/update';
import { AnalyticsService } from '~/src/services/analytic/AnalyticsService';
import * as Constants from 'expo-constants';
import http from '~/src/utils/http';
import { AppUpdateT } from '~/src/types/AppVersion';
import { compareAppVersions } from '~/src/utils/compareAppVersion';
import AppVersion from '../../Common/AppVersion';
import { Platform } from 'react-native';
import { OtaUpdateServices } from '~/src/services/update/checkForOtaUpdate';
import { UPDATE_ENDPOINTS } from '~/src/libs/endpoints/update';

const currentAppVersion = Constants.default.expoConfig?.version || '0.0.1';

export const UpdateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isShowUpdateDialog, setIsShowUpdateDialog] = useState(false);

  const { isFetching, data, refetch } = useQuery({
    queryKey: ['update'],
    queryFn: () => http.get<AppUpdateT>(UPDATE_ENDPOINTS.GET_LATEST_UPDATE),
    select: (res) => res.data,
    refetchInterval: 5 * 60 * 1000, // check every 5 min
    enabled: !isUpdateAvailable,
  });

  useEffect(() => {
    const init = async () => {
      await AnalyticsService.getOrCreateUserId();
      await AnalyticsService.syncUser();
    };
    init();
  }, []);

  useEffect(() => {
    const checkVersion = async () => {
      if (!data) return;

      // Check if update is for current platform
      const isPlatformMatch =
        data.platforms.length === 0 || // Empty array means all platforms
        data.platforms.some((platform) => platform === Platform.OS.toUpperCase());

      if (!isPlatformMatch) return;

      const isPtaUpdate = data.type === 'PTA';
      const isOtaUpdate = data.type === 'OTA';

      if (isPtaUpdate) {
        // PTA: Show dialog immediately (requires app store download)

        // Check if server version is newer than current app version
        const isNewerVersionAvailable = compareAppVersions(currentAppVersion, data.version);

        if (!isNewerVersionAvailable) return;

        setIsUpdateAvailable(true);
        setIsShowUpdateDialog(true);
        return;
      }

      if (isOtaUpdate) {
        // OTA: Check if EAS update is actually available
        const isOtaAvailable =
          process.env.NODE_ENV === 'development'
            ? true
            : await OtaUpdateServices.checkForOtaUpdate();

        if (isOtaAvailable) {
          // Both server says OTA is released AND EAS has the update
          setIsUpdateAvailable(true);
          setIsShowUpdateDialog(true);
        } else {
          // Server says OTA but EAS doesn't have it yet
          console.warn('OTA update announced but not yet available on EAS');
        }
      }
    };

    checkVersion();
  }, [data]);

  return (
    <UpdateContext.Provider
      value={{
        isUpdateAvailable: isUpdateAvailable,
        isUpdateLoading: isFetching,
        currentAppVersion: currentAppVersion,
        refresh: () => refetch(),
        update: data,
        isShowUpdateDialog: isShowUpdateDialog,
        dismiss: () => setIsShowUpdateDialog(false),
      }}>
      <AppVersion />
      {children}
    </UpdateContext.Provider>
  );
};
