import * as Updates from 'expo-updates';
import * as Network from 'expo-network';
import { logger } from '~/src/utils/logger';

export async function checkForOtaUpdate() {
  try {
    const network = await Network.getNetworkStateAsync();

    const isOnline = network.isConnected;

    if (!isOnline) {
      return;
    }

    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      const fetched = await Updates.fetchUpdateAsync();

      if (fetched.isNew) {
        await Updates.reloadAsync();
      }
    }
  } catch (error: any) {
    logger.error('Failed to check for updates');
  }
}
