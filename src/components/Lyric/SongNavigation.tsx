import React from 'react';
import { View } from 'react-native';
import { Button } from '../Button';
import { Text } from '~/src/components/ui/typography';

type SongNavigationProps = {
  onNext: () => void;
  onPrevious: () => void;
  songNumber: number;
};

export const SongNavigation = ({ onNext, onPrevious, songNumber }: SongNavigationProps) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white/80 px-5 py-4 backdrop-blur-md">
      <View className="flex-row items-center justify-between">
        <Button title="Previous" onPress={onPrevious} className="mr-3 flex-1" />
        <Text className="mx-1 font-medium text-gray-500">#{songNumber}</Text>
        <Button title="Next" onPress={onNext} className="ml-3 flex-1" />
      </View>
    </View>
  );
};
