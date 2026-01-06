import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import http from '@repo/utils';
import uuid from 'react-native-uuid';
import * as Constant from 'expo-constants';
import { ANALYTIC_ENDPOINTS } from '~/src/libs/endpoints/analytic';
const USER_ID_KEY = 'user_id';

const SYNC_PENDING_KEY = 'pending_user_sync';

export const AnalyticsService = {
  async getOrCreateUserId(): Promise<string> {
    let userId = await AsyncStorage.getItem(USER_ID_KEY);
    if (!userId) {
      userId = uuid.v4();
      await AsyncStorage.setItem(USER_ID_KEY, userId);
      await AsyncStorage.setItem(SYNC_PENDING_KEY, 'true');
    }
    return userId;
  },

  async syncUser(): Promise<void> {
    // Sync user so that last login time is updated in the server

    // const hasPending = await AsyncStorage.getItem(SYNC_PENDING_KEY);
    // console.log('hasPending', hasPending);
    // if (!hasPending) return;

    const network = await Network.getNetworkStateAsync();

    if (!network.isConnected) return;

    const userId = await AsyncStorage.getItem(USER_ID_KEY);

    if (!userId) return;

    try {
      const res = await http.post(ANALYTIC_ENDPOINTS.POST_ANALYTIC_USERS, {
        userId,
        appVersion: Constant.default.expoConfig?.version || '',
      });

      if (res.success) {
        await AsyncStorage.removeItem(SYNC_PENDING_KEY);
      }
    } catch (err) {
      console.log('Sync failed:', err);
    }
  },
};
