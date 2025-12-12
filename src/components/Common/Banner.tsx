import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '~/src/libs/cn';
import { Text } from '../ui/typography';
import { useBannerStore } from '~/src/libs/stores/banner/useBannerStore';

export type BannerVariant = 'info' | 'success' | 'error' | 'warning';

type BannerProps = {
  className?: string;
  style?: ViewStyle;
};

export const Banner: React.FC<BannerProps> = ({ className, style }) => {
  const { banner } = useBannerStore();
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (banner.visible) {
      height.value = withTiming(32, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 150,
        easing: Easing.out(Easing.cubic),
      });
      height.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [banner.visible, height, opacity]);

  const variantClass =
    banner.variant === 'success'
      ? 'bg-emerald-500 dark:bg-emerald-900'
      : banner.variant === 'error'
        ? 'bg-red-500 dark:bg-red-900'
        : banner.variant === 'warning'
          ? 'bg-amber-500 dark:bg-amber-900'
          : 'bg-indigo-500 dark:bg-indigo-900';

  return (
    <Animated.View className="w-full" style={style}>
      <Animated.View
        style={containerStyle}
        className={cn('items-center justify-center', variantClass, className)}>
        <View className="flex-1 items-center justify-center px-3">
          <Text weight="medium" className="text-center text-white">
            {banner.message}
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};
