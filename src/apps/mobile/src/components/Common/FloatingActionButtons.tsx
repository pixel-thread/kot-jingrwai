import React from 'react';
import { View } from 'react-native';
import { cn } from '~/src/libs/cn';
import { MiniMusicPlayer } from './MiniMusicPlayer';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const FloatingActionButtons = ({ className, children }: Props) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <View
      pointerEvents="box-none"
      className={cn(
        'absolute bottom-4 left-0 right-0 z-50 items-center justify-center',
        className
      )}>
      <View
        className={cn(
          'w-[92%] rounded-2xl border border-gray-300 bg-gray-200/90 px-3 py-2 shadow-lg shadow-gray-900/50',
          'dark:border-gray-900 dark:bg-gray-950/95',
          'backdrop-blur-3xl'
        )}>
        {children}
      </View>
    </View>
  );
};
