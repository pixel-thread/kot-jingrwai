import { useEffect } from 'react';
import { UpdateContext } from '~/src/context/update';
import { checkForOtaUpdate } from '~/src/services/update/checkForOtaUpdate';

export const UpdateContextProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      checkForOtaUpdate();
    }
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
