import { forwardRef } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
} from 'react-native';
import Reanimated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/src/libs/cn';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/* -------------------------------------------------------------------------- */
/*                                    CVA                                     */
/* -------------------------------------------------------------------------- */

const buttonVariants = cva('items-center justify-center rounded-xl w-full', {
  variants: {
    variant: {
      primary: 'bg-indigo-600 dark:bg-indigo-900',
      secondary: 'bg-gray-200 dark:bg-gray-800',
      outline: 'bg-transparent border border-indigo-500 dark:border-indigo-400',
      destructive: 'bg-red-600 dark:bg-red-900',
    },
    size: {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
    },
    disabled: {
      true: 'opacity-50',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const textVariants = cva('text-center font-semibold', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'text-gray-800 dark:text-white',
      outline: 'text-indigo-600 dark:text-indigo-400',
      destructive: 'text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type ButtonProps = TouchableOpacityProps &
  VariantProps<typeof buttonVariants> & {
    title: string;
    loading?: boolean;
    icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    iconPosition?: 'left' | 'right';
    containerClassName?: string;
  };

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      title,
      variant,
      size,
      loading = false,
      icon,
      iconPosition = 'left',
      disabled,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
      scale.value = withSpring(0.95, { damping: 10 });
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, { damping: 10 });
    };

    return (
      <Reanimated.View className={cn(containerClassName, 'overflow-hidden')} style={animatedStyle}>
        <TouchableOpacity
          ref={ref}
          disabled={disabled || loading}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className={cn(buttonVariants({ variant, size, disabled }), className)}
          {...props}>
          <View className="flex-row items-center justify-center">
            {loading ? (
              <ActivityIndicator
                size="small"
                color={variant === 'primary' ? 'white' : '#6366f1'}
                className="mr-2"
              />
            ) : (
              icon &&
              iconPosition === 'left' && (
                <View className="mr-2">
                  <MaterialCommunityIcons name={icon} size={24} color="white" />
                </View>
              )
            )}

            <Text className={textVariants({ variant, size })}>{title}</Text>

            {!loading && icon && iconPosition === 'right' && (
              <View className="ml-2">
                <MaterialCommunityIcons name={icon} size={24} color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Reanimated.View>
    );
  }
);

Button.displayName = 'Button';
