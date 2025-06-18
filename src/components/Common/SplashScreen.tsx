import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withTiming(
      1,
      {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      },
      () => runOnJS(onFinish)()
    );
  }, [opacity, scale, onFinish]);

  return (
    <View className="flex-1 items-center justify-center bg-gray-200 dark:bg-gray-950">
      <Animated.Image
        src={'~/assets/icons/splash.png'}
        style={[{ width: 160, height: 160 }, animatedStyle]}
        resizeMode="contain"
        className="dark:tint-white"
      />
    </View>
  );
};
