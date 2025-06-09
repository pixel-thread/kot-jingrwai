import { Dimensions } from 'react-native';
import { useSharedValue, runOnJS } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

type UseSwipeGestureProps = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
};

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseSwipeGestureProps) {
  const translationX = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .minDistance(10)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = width / 2 - 50;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
    })
    .onEnd((event) => {
      if (event.translationX > threshold && onSwipeRight) {
        runOnJS(onSwipeRight)();
      } else if (event.translationX < -threshold && onSwipeLeft) {
        runOnJS(onSwipeLeft)();
      }

      translationX.value = 0;
    })
    .runOnJS(true);

  return gesture;
}
