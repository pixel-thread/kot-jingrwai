import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cn } from '~/src/libs/cn';

export const textVariants = cva(
  'text-black antialias tracking-wider whitespace-pre-line font-sans dark:text-gray-200',
  {
    variants: {
      size: {
        base: 'text-base', // default size
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
      },
      decoration: {
        none: 'text-decoration-none',
        underline: 'text-decoration-underline',
        lineThrough: 'text-decoration-line-through',
        overline: 'text-decoration-overline',
      },
      italic: {
        true: 'italic',
        false: 'not-italic',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      variant: {
        default: '',
        primary: 'text-blue-600 dark:text-blue-400',
        secondary: 'text-gray-600 dark:text-gray-300',
        muted: 'text-gray-400 dark:text-gray-500',
        error: 'text-red-600 dark:text-red-400',
        success: 'text-green-600 dark:text-green-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
      },
    },
    defaultVariants: {
      size: 'base',
      weight: 'normal',
      align: 'left',
      variant: 'default',
      decoration: 'none',
      italic: false,
    },
  }
);

export type TextVariantProps = VariantProps<typeof textVariants>;

type CustomTextProps = RNTextProps &
  TextVariantProps & {
    children: React.ReactNode;
    className?: string;
  };

export const Text = ({
  children,
  className,
  size,
  weight,
  align,
  variant,
  ...rest
}: CustomTextProps) => {
  return (
    <RNText
      {...rest}
      className={cn(textVariants({ size: size, weight, align, variant }), className)}>
      {children}
    </RNText>
  );
};
