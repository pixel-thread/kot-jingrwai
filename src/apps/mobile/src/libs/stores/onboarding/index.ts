import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseOnboardingStoreT = {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (hasCompleted: boolean) => void;
};

export const useOnboardingStore = create<UseOnboardingStoreT>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (hasCompleted: boolean) =>
        set({ hasCompletedOnboarding: hasCompleted }),
    }),

    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
