import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseThemeStoreT = {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

export const useThemeStore = create<UseThemeStoreT>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme: 'light' | 'dark' | 'system') => set({ theme }),
    }),

    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage), // ✅ WRAPPED AsyncStorage
    }
  )
);
