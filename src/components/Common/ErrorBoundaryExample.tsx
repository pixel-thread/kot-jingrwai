import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../ui/typography';
import { ErrorBoundary } from './ErrorBoundary';
import Reanimated, { FadeIn } from 'react-native-reanimated';

/**
 * A component that demonstrates how to use the ErrorBoundary
 * by intentionally throwing an error when a button is pressed.
 */
const BuggyCounter = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  if (counter === 5) {
    // Simulate an error when counter reaches 5
    throw new Error('Counter reached 5!');
  }

  return (
    <Reanimated.View entering={FadeIn.duration(500)} className="items-center justify-center p-4">
      <Text size="xl" weight="bold" className="mb-4">
        Counter: {counter}
      </Text>
      <Text size="md" className="mb-6 text-center">
        This component will crash when the counter reaches 5.
      </Text>
      <TouchableOpacity
        onPress={handleIncrement}
        className="rounded-lg bg-blue-600 px-6 py-3 dark:bg-blue-500">
        <Text size="md" weight="semibold" className="text-white">
          Increment
        </Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
};

/**
 * Example component that demonstrates how to use the ErrorBoundary
 */
export const ErrorBoundaryExample = () => {
  return (
    <View className="flex-1 p-4">
      <Text size="2xl" weight="bold" className="mb-6 text-center">
        Error Boundary Example
      </Text>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </View>
  );
};
