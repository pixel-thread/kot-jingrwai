import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

type UseTapGestureProps = {
  onTap: () => void;
  numberOfTaps?: number;
  simultaneousRef?: React.RefObject<any>;
};

export function useTapGesture({ onTap, numberOfTaps = 1, simultaneousRef }: UseTapGestureProps) {
  const gesture = Gesture.Tap()
    .numberOfTaps(numberOfTaps)
    .onEnd((_event, success) => {
      if (success) {
        runOnJS(onTap)();
      }
    });
  if (simultaneousRef) {
    gesture.simultaneousWithExternalGesture(simultaneousRef);
  }
  return gesture;
}
