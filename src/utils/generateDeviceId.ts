import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'UNIQUE_DEVICE_ID';

export async function generateUniqueDeviceId(): Promise<string> {
  try {
    let id = await AsyncStorage.getItem(KEY);
    if (id) return id;

    id = uuidv4(); // now works
    await AsyncStorage.setItem(KEY, id);
    return id;
  } catch (err) {
    console.error(err);
    return '';
  }
}
