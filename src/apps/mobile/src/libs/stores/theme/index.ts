import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeT } from '@repo/types';

type UseThemeStoreT = {
  theme: ThemeT;
  setTheme: (theme: ThemeT) => void;
};

export const useThemeStore = create<UseThemeStoreT>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme: ThemeT) => set({ theme }),
    }),

    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage), // ✅ WRAPPED AsyncStorage
    }
  )
);
