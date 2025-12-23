import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { TouchableOpacity, View } from 'react-native';
import { gray } from 'tailwindcss/colors';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { ThemeToggle } from '~/src/components/Common/theme/ThemeToggle';
import { useTextStore } from '~/src/libs/stores/text';

const HeaderRight = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { increaseTextSize, decreaseTextSize } = useTextStore();

  return (
    <View className="flex-row items-center gap-x-4">
      <TouchableOpacity
        onPress={increaseTextSize}
        className="h-10 w-10 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-600/50">
        <MaterialCommunityIcons
          name={'plus'}
          size={24}
          color={isDarkMode ? gray[200] : gray[950]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={decreaseTextSize}
        className="h-10 w-10 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-600/50">
        <MaterialCommunityIcons
          name={'minus'}
          size={24}
          color={isDarkMode ? gray[200] : gray[950]}
        />
      </TouchableOpacity>
    </View>
  );
};
export default function KhorusLayout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<HeaderRight />} />
          ),
          title: 'Apostle Creed',
          headerShown: true,
        }}
      />
    </View>
  );
}
