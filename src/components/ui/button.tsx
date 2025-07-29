import { forwardRef } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
} from 'react-native';
import { cn } from '~/src/libs/cn';
import Reanimated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type ButtonProps = {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      title,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      ...touchableProps
    },
    ref
  ) => {
    // Animation for press feedback
    const scale = useSharedValue(1);

    const handlePressIn = () => {
      scale.value = withSpring(0.95, { damping: 10 });
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, { damping: 10 });
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const getButtonStyle = () => {
      const baseStyle = 'items-center justify-center rounded-xl shadow-sm';

      const variantStyles = {
        primary: 'bg-gradient-to-r from-indigo-600 to-purple-600',
        secondary: 'bg-gray-200 dark:bg-gray-800',
        outline: 'bg-transparent border border-indigo-500 dark:border-indigo-400',
      };

      const sizeStyles = {
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-6 py-4',
      };

      return cn(
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        touchableProps.disabled && 'opacity-50'
      );
    };

    const getTextStyle = () => {
      const baseStyle = 'text-center font-semibold';

      const variantStyles = {
        primary: 'text-white',
        secondary: 'text-gray-800 dark:text-white',
        outline: 'text-indigo-600 dark:text-indigo-400',
      };

      const sizeStyles = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      };

      return cn(baseStyle, variantStyles[variant], sizeStyles[size]);
    };

    return (
      <Reanimated.View style={animatedStyle}>
        <TouchableOpacity
          ref={ref}
          {...touchableProps}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className={cn(getButtonStyle(), touchableProps.className)}>
          <View className="flex-row items-center justify-center">
            {loading ? (
              <ActivityIndicator
                size="small"
                color={variant === 'primary' ? 'white' : '#6366f1'}
                className="mr-2"
              />
            ) : icon && iconPosition === 'left' ? (
              <View className="mr-2">{icon}</View>
            ) : null}

            <Text className={getTextStyle()}>{title}</Text>

            {!loading && icon && iconPosition === 'right' && <View className="ml-2">{icon}</View>}
          </View>
        </TouchableOpacity>
      </Reanimated.View>
    );
  }
);

Button.displayName = 'Button';
