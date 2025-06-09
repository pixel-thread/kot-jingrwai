import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TextSize = 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

type UseTextStoreT = {
  size: TextSize;
  cycleTextSize: () => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
};

const textSizes: TextSize[] = ['md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];

export const useTextStore = create<UseTextStoreT>()(
  persist(
    (set, get) => ({
      size: 'xl',
      increaseTextSize: () => {
        const currentIndex = textSizes.indexOf(get().size);
        const nextSize = textSizes[(currentIndex + 1) % textSizes.length];
        set({ size: nextSize });
      },
      decreaseTextSize: () => {
        const currentIndex = textSizes.indexOf(get().size);
        const nextSize = textSizes[(currentIndex - 1 + textSizes.length) % textSizes.length];
        set({ size: nextSize });
      },
      cycleTextSize: () => {
        const currentIndex = textSizes.indexOf(get().size);
        const nextSize = textSizes[(currentIndex + 1) % textSizes.length];
        set({ size: nextSize });
      },
    }),

    {
      name: 'text-storage',
      storage: createJSONStorage(() => AsyncStorage), // ✅ WRAPPED AsyncStorage
    }
  )
);
