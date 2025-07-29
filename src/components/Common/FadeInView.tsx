import React, { useEffect } from 'react';
import { ViewProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { InView } from 'react-native-intersection-observer';

interface FadeInViewProps extends ViewProps {
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  duration = 500,
  delay = 0,
  style,
  ...rest
}) => {
  const opacity = useSharedValue(0);

  const { inView, ref } = useInView({
    threshold: 0.5, // 50% visibility triggers animation
  });

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        opacity.value = withTiming(1, { duration });
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [opacity, duration, delay, inView]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View ref={ref} style={[animatedStyle, style]} {...rest}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
