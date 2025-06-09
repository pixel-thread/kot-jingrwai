import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

type UseTapGestureProps = {
  onTap: () => void;
  numberOfTaps?: number;
};

export function useTapGesture({ onTap, numberOfTaps = 1 }: UseTapGestureProps) {
  return Gesture.Tap()
    .numberOfTaps(numberOfTaps)
    .onEnd((_event, success) => {
      if (success) {
        runOnJS(onTap)();
      }
    });
}
