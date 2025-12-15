import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { cn } from '~/src/libs/cn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { MiniMusicPlayer } from './MiniMusicPlayer';

type ActionButton = {
  onPress: () => void;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label?: string;
  disabled?: boolean;
};

type MusicPlayerProps = {
  title?: string;
  artist?: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
  onPrev?: () => void;
};

type Props = {
  // buttons: ActionButton[];
  // music?: MusicPlayerProps | null;
};

export const FloatingActionButtons = ({}: Props) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <View
      pointerEvents="box-none"
      className="absolute bottom-4 left-0 right-0 z-50 items-center justify-center">
      <View
        className={cn(
          'w-[92%] rounded-2xl border border-gray-300 bg-gray-200/90 px-3 py-2 shadow-lg shadow-gray-900/50',
          'dark:border-gray-900 dark:bg-gray-950/95',
          'backdrop-blur-3xl'
        )}>
        {/* Mini Music Player */}
        <MiniMusicPlayer />
      </View>
    </View>
  );
};
