import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../key";

export const TokenStoreManager = {
  isTokenSet: async (): Promise<boolean> => {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    return !!accessToken;
  },
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
