import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { UpdateContext } from '~/src/context/update';
import { AppUpdateT } from '~/src/types/AppVersion';
import { UpdateI } from '~/src/types/Update';
import { generateUniqueDeviceId } from '~/src/utils/generateDeviceId';
import http from '~/src/utils/http';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { useAppVersionStore } from '~/src/libs/stores/appVersion';

function compareVersions(v1: string, v2: string): number {
  const s1 = v1.split('.').map(Number);
  const s2 = v2.split('.').map(Number);
  for (let i = 0; i < Math.max(s1.length, s2.length); i++) {
    const num1 = s1[i] || 0;
    const num2 = s2[i] || 0;
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }
  return 0;
}

export const UpdateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const { setPrevVersion } = useAppVersionStore();
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const appVersion = Constants.expoConfig?.version; // safer than manifest
  const [update, setUpdate] = useState<AppUpdateT | null>();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['app-update'],
    queryFn: async () => http.get<AppUpdateT>(`/version?id=${deviceId}`),
    enabled: !!deviceId,
  });

  const getDeviceId = async () => {
    const id = await generateUniqueDeviceId();
    if (id) {
      setDeviceId(id);
    }
  };

  const handleDismiss = () => {
    if (data?.data?.version) {
      setPrevVersion(data.data.version);
    }
  };

  useEffect(() => {
    getDeviceId();
  }, []);

  useEffect(() => {
    if (data?.success && data.data && appVersion) {
      const fetchedUpdate = data.data;
      const serverVersion = fetchedUpdate.version;
      const updatePlatforms = fetchedUpdate.platforms || [];
      const currentPlatform = Platform.OS;
      const isPlatformSupported = updatePlatforms.includes(currentPlatform);
      const isServerHigher = compareVersions(serverVersion, appVersion) > 0;

      if (isServerHigher && isPlatformSupported) {
        // Always show update notification when server version is higher
        setUpdate(fetchedUpdate);
        // Delay showing content for smooth animation
        setTimeout(() => setIsUpdateAvailable(true), 500);
      } else {
        setIsUpdateAvailable(false);
        setUpdate(null);
      }
    }
  }, [data, appVersion]);

  const value = {
    dismiss: () => handleDismiss(),
    refresh: () => refetch(),
    isUpdateAvailable: !isLoading && !isFetching ? isUpdateAvailable : false,
    update: update,
    isUpdateLoading: isLoading || isFetching,
    appVersion: appVersion || '',
  } satisfies UpdateI;

  return <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>;
};
