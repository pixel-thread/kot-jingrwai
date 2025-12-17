import * as Network from 'expo-network';
import { onlineManager } from '@tanstack/react-query';

/**
 * Sync Expo network state with React Query
 */
export function setupOnlineManager(): () => void {
  // Initial state
  Network.getNetworkStateAsync().then((state) => {
    onlineManager.setOnline(Boolean(state.isConnected));
  });

  // Listen for changes
  const subscription = Network.addNetworkStateListener((state) => {
    onlineManager.setOnline(Boolean(state.isConnected));
  });

  return () => subscription.remove();
}
