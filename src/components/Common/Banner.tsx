import { useEffect } from 'react';
import { View } from 'react-native';
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '../ui/typography';
import { cn } from '~/src/libs/cn';

type Props = {
  isShown: boolean;
  message: string;
};
export const Banner = ({ isShown, message }: Props) => {
  const height = useSharedValue(0);

  const opacity = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  function showBanner() {
    height.value = withTiming(32, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }

  function hideBanner() {
    opacity.value = withTiming(0, {
      duration: 150,
      easing: Easing.out(Easing.cubic),
    });
    height.value = withTiming(0, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
  }

  useEffect(() => {
    if (isShown) {
      showBanner();
    } else {
      hideBanner();
    }
  }, [isShown]);

  return (
    <Reanimated.View className="w-full">
      <Reanimated.View
        style={containerStyle}
        className={cn('items-center justify-center', 'bg-indigo-500 dark:bg-indigo-900')}>
        <View className="flex-1 items-center justify-center px-3">
          <Text weight="medium" className="text-center text-white">
            {message}
          </Text>
        </View>
      </Reanimated.View>
    </Reanimated.View>
  );
};
