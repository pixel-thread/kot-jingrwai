import { useEffect } from 'react';
import { UpdateContext } from '~/src/context/update';
import { checkForOtaUpdate } from '~/src/services/update/checkForOtaUpdate';

export const UpdateContextProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    checkForOtaUpdate();
  }, []);

  return <UpdateContext.Provider value={null}>{children}</UpdateContext.Provider>;
};
