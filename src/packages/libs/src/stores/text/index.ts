import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

type UseTextStoreT = {
  size: TextSize;
  isSelectable: boolean;
  cycleTextSize: () => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  setIsSelectable: (value: boolean) => void;
};

const textSizes: TextSize[] = ["md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"];

export const useTextStore = create<UseTextStoreT>()(
  persist(
    (set, get) => ({
      size: "xl",
      isSelectable: true,
      setIsSelectable: (value: boolean) => set({ isSelectable: value }),
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
      name: "text-storage",
      storage: createJSONStorage(() => AsyncStorage), // ✅ WRAPPED AsyncStorage
    }
  )
);
