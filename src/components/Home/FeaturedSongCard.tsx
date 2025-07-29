import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { Text } from '~/src/components/ui/typography';
import { cn } from '~/src/libs/cn';

type FeaturedSongCardProps = {
  songNumber: number;
  title: string;
  author?: string;
  variant?: 'primary' | 'secondary';
  onPress: () => void;
};

export const FeaturedSongCard = ({
  songNumber,
  title,
  author,
  variant = 'primary',
  onPress,
}: FeaturedSongCardProps) => {
  const getGradient = () => {
    if (variant === 'primary') {
      return 'bg-gradient-to-br from-indigo-500 to-purple-600';
    }
    return 'bg-gradient-to-br from-pink-500 to-orange-400';
  };

  return (
    <Reanimated.View entering={FadeIn.duration(500)}>
      <TouchableOpacity
        onPress={onPress}
        className={cn(
          'w-[160px] overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800',
          variant === 'secondary' && 'border border-gray-100 dark:border-gray-700'
        )}
        style={
          Platform.OS === 'ios'
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }
            : {}
        }>
        <View className={cn('h-[100px] items-center justify-center', getGradient())}>
          <MaterialCommunityIcons name="music-circle" size={50} color="white" />
          <View className="absolute right-2 top-2 rounded-full bg-black/30 px-2 py-1">
            <Text size="xs" weight="bold" className="text-white">
              #{songNumber}
            </Text>
          </View>
        </View>
        <View className="p-3">
          <Text weight="semibold" numberOfLines={1} className="text-gray-800 dark:text-white">
            {title}
          </Text>
          {author && (
            <View className="mt-1 flex-row items-center">
              <MaterialCommunityIcons name="account" size={14} color="#9CA3AF" />
              <Text size="xs" variant="muted" numberOfLines={1} className="ml-1">
                {author}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Reanimated.View>
  );
};
