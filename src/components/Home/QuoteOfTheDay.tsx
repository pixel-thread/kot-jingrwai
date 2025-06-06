import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '~/src/components/ui/typography';
export const QuoteOfTheDay = () => {
  return (
    <View className="mb-6 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
      <Text className="mb-1 text-lg font-semibold">Quote of the Day</Text>
      <Text className="mb-2 text-base italic text-gray-700">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, possimus obcaecati!
        Excepturi ipsa earum, quos beatae eaque tenetur! Nisi nesciunt iste qui facilis blanditiis
        perferendis nihil doloribus enim dignissimos tempora.
      </Text>
      <Text className="text-right text-sm text-gray-500">— Lorem Ipsum</Text>
    </View>
  );
};
