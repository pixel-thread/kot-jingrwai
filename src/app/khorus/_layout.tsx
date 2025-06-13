import { Stack, useLocalSearchParams } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTapGesture } from '~/src/hooks/useTapGesture';
import { FloatingActionButtons } from '~/src/components/Common/FloatingActionButtons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { useTextStore } from '~/src/libs/stores/text';
import colors from 'tailwindcss/colors';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { CustomHeader } from '~/src/components/Common/CustomHeader';

export default function KhorusLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { increaseTextSize, decreaseTextSize } = useTextStore();
  const [isShowFloatingButton, setIsShowFloatingButton] = useState(false);
  const { khorusNo } = useLocalSearchParams();
  const singleTap = () => setIsShowFloatingButton(true);

  const singleTapGesture = useTapGesture({
    onTap: singleTap,
    numberOfTaps: 1,
  });

  const combinedGesture = Gesture.Simultaneous(singleTapGesture);

  useEffect(() => {
    if (isShowFloatingButton) {
      setTimeout(() => {
        setIsShowFloatingButton(false);
      }, 5000);
    }
  }, [setIsShowFloatingButton, isShowFloatingButton]);

  return (
    <GestureDetector gesture={combinedGesture}>
      <View className="flex-1" collapsable={false}>
        <Stack
          screenOptions={{
            headerShown: true,
            header: ({ options }) => <CustomHeader back options={options} />,
            title: `Khorus ${khorusNo}` || khorusNo.toString(),
          }}>
          <Stack.Screen name="index" />
        </Stack>
        <FloatingActionButtons
          isVisible={isShowFloatingButton}
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
    </GestureDetector>
  );
}
