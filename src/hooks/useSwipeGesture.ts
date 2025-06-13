import { useSharedValue, runOnJS } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

type UseSwipeGestureProps = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  simultaneousRef?: React.RefObject<any>;
  maxPointers?: number;
};

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  simultaneousRef,
  maxPointers = 1,
}: UseSwipeGestureProps) {
  const translationX = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const gesture = Gesture.Pan()
    .minDistance(15)
    .maxPointers(maxPointers)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
    })
    .onUpdate((event) => {
      translationX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > threshold && onSwipeRight) {
        runOnJS(triggerHaptic)();
        runOnJS(onSwipeRight)();
      } else if (event.translationX < -threshold && onSwipeLeft) {
        runOnJS(triggerHaptic)();
        runOnJS(onSwipeLeft)();
      }
      translationX.value = 0;
    })
    .runOnJS(true);

  if (simultaneousRef) {
    gesture.simultaneousWithExternalGesture(simultaneousRef);
  }

  return gesture;
}
