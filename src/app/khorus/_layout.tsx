import { Stack, useLocalSearchParams } from 'expo-router';
import { FloatingActionButtons } from '~/src/components/Common/FloatingActionButtons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTextStore } from '~/src/libs/stores/text';
import colors from 'tailwindcss/colors';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { ThemeToggle } from '~/src/components/Common/theme/ThemeToggle';

export default function KhorusLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { increaseTextSize, decreaseTextSize } = useTextStore();
  const { khorusNo } = useLocalSearchParams();

  return (
    <View className="flex-1" collapsable={false}>
      <Stack
        screenOptions={{
          headerShown: true,
          header: ({ options }) => (
            <CustomHeader back options={options} headerRight={<ThemeToggle />} />
          ),
          title: khorusNo.toString(),
        }}>
        <Stack.Screen name="index" />
      </Stack>
      <FloatingActionButtons
        isVisible
        buttons={[
          {
            onPress: increaseTextSize,
            icon: (
              <FontAwesome
                color={isDarkMode ? colors.gray[200] : colors.gray[950]}
                name="plus"
                size={20}
              />
            ),
          },
          {
            onPress: decreaseTextSize,
            icon: (
              <FontAwesome
                name="minus"
                size={20}
                color={isDarkMode ? colors.gray[200] : colors.gray[950]}
              />
            ),
          },
        ]}
      />
    </View>
  );
}
