import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, TOKEN_STORE_KEY } from "../../key";

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const TokenStoreManager = {
  getItem: async (key: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(key);
  },
  setTokens: async (accessToken: string, refreshToken: string): Promise<void> => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    await SecureStore.deleteItemAsync(key);
  },
};

export const useTokenManager = create<TokenState>()(
  persist(
    (set, get) => ({
      accessToken: get().accessToken,
      refreshToken: get().refreshToken,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: TOKEN_STORE_KEY,
      storage: createJSONStorage(() => TokenStoreManager),
    }
  )
);
