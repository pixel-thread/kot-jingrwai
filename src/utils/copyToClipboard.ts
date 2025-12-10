import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Platform, ToastAndroid } from 'react-native';
import { runOnJS } from 'react-native-reanimated';

const triggerHaptic = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

export const copyToClipboard = async (text: string) => {
  if (text !== '') {
    await Clipboard.setStringAsync(text);
    // add toast and feed back
    if (Platform.OS === 'android') {
      runOnJS(triggerHaptic)();
      ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    }
  }
};
