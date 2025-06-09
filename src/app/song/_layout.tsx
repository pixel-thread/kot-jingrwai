import { Stack } from 'expo-router';
import { FloatingActionButtons } from '~/src/components/Common/FloatingActionButtons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTextStore } from '~/src/libs/stores/text';
import colors from 'tailwindcss/colors';
import { useColorScheme } from 'nativewind';

export default function SongLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { increaseTextSize, decreaseTextSize } = useTextStore();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
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
    </>
  );
}
