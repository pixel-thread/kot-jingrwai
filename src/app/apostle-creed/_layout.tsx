import { Stack } from 'expo-router';
import { FloatingActionButtons } from '~/src/components/Common/FloatingActionButtons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTextStore } from '~/src/libs/stores/text';
import { gray } from 'tailwindcss/colors';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

export default function KhorusLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { increaseTextSize, decreaseTextSize } = useTextStore();

  return (
    <View className="flex-1">
      <Stack />
      <FloatingActionButtons
        isVisible
        buttons={[
          {
            onPress: decreaseTextSize,
            icon: <FontAwesome name="minus" size={20} color={isDarkMode ? gray[200] : gray[950]} />,
          },
          {
            onPress: increaseTextSize,
            icon: <FontAwesome color={isDarkMode ? gray[200] : gray[950]} name="plus" size={20} />,
          },
        ]}
      />
    </View>
  );
}
