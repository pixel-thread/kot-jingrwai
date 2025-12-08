import { useEffect } from 'react';
import { UpdateContext } from '~/src/context/update';
import { AnalyticsService } from '~/src/services/analytic/AnalyticsService';
import { checkForOtaUpdate } from '~/src/services/update/checkForOtaUpdate';

export const UpdateContextProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      checkForOtaUpdate();
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await AnalyticsService.getOrCreateUserId();
      await AnalyticsService.syncUser();
    };
    init();
  }, []);

  return (
    <UpdateContext.Provider
      value={{
        isUpdateAvailable: false,
        isUpdateLoading: false,
        appVersion: '1.0.0',
        refresh: () => {},
        dismiss: () => {},
        update: null,
      }}>
      {children}
    </UpdateContext.Provider>
  );
};
