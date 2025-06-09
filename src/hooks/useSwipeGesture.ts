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

  const gesture = Gesture.Pan()
    .minDistance(15) // minimum distance to trigger the gesture
    .maxPointers(maxPointers) // maximum number of pointers to trigger the gesture
    .onStart(() => {
      prevTranslationX.value = translationX.value;
    })
    .onUpdate((event) => {
      translationX.value = event.translationX;
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

  if (simultaneousRef) {
    gesture.simultaneousWithExternalGesture(simultaneousRef);
  }

  return gesture;
}
