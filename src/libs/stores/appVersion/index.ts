import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppUpdateT } from '~/src/types/AppVersion';

type UseAppVersionStore = {
  isUserIgnoredUpdate: boolean;
  setIsUserIgnoredUpdate: (isIgnored: boolean) => void;
  // Actions
  prevVersion: string;
  setPrevVersion: (version: string) => void;

  setUpdate: (update: AppUpdateT | null) => void;
  update: AppUpdateT | null;
};

export const useAppVersionStore = create<UseAppVersionStore>()(
  persist(
    (set, _) => ({
      isUserIgnoredUpdate: false,
      setIsUserIgnoredUpdate: (isIgnored: boolean) => set({ isUserIgnoredUpdate: isIgnored }),

      prevVersion: '',
      setPrevVersion: (version: string) => set({ prevVersion: version }),

      update: null,
      setUpdate: (update: AppUpdateT | null) => set({ update }),
    }),
    {
      name: 'app-version-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
