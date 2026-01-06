import * as Updates from 'expo-updates';
import * as Network from 'expo-network';
import { logger } from '@repo/utils';

export const OtaUpdateServices = {
  async checkForOtaUpdate(): Promise<boolean> {
    try {
      const network = await Network.getNetworkStateAsync();

      const isOnline = network.isConnected;

      if (!isOnline) {
        return false;
      }

      const update = await Updates.checkForUpdateAsync();

      return update.isAvailable;
    } catch (error) {
      logger.error('Failed to check for updates', { error });
      return false;
    }
  },

  async applyOtaUpdate() {
    const isAvailable = await OtaUpdateServices.checkForOtaUpdate();

    if (isAvailable) {
      const fetched = await Updates.fetchUpdateAsync();

      if (fetched.isNew) {
        await Updates.reloadAsync();
      }
    }
  },

  async checkAndApplyOta() {
    try {
      const isAvailable = await OtaUpdateServices.checkForOtaUpdate();
      if (isAvailable) {
        await OtaUpdateServices.applyOtaUpdate();
      }
    } catch (error) {
      logger.error('Failed to check for updates', { error });
      return false;
    }
  },
};
