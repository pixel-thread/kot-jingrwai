import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Platform, TouchableOpacity, View } from 'react-native';
import { gray } from 'tailwindcss/colors';
import { Text } from '../ui/typography';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ReactNode } from 'react';
import { BetaBatch } from './BetaBatch';
import { Ternary } from './Ternary';
import { useEffect } from 'react';

import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';

import { OtaUpdateBanner } from './OtaUpdateBanner';

type Props = {
  options?: { title?: string };
  back?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
};

export const CustomHeader: React.FC<Props> = ({ back, options, headerLeft, headerRight }) => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const isBeta = process.env.EXPO_PUBLIC_IS_BETA === 'true' || false;

  // Animation values
  const headerOpacity = useSharedValue(0.9);

  useEffect(() => {
    // Animate header when component mounts
    headerOpacity.value = withTiming(1, { duration: 800 });
  }, [headerOpacity]);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });

  const onPressBackButton = () => router.back();

  return (
    <Reanimated.View
      style={headerAnimatedStyle}
      className="w-full overflow-hidden border-b border-gray-300 bg-gray-200 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <View className="flex flex-row items-center justify-between p-4 px-4">
        {isBeta && <BetaBatch />}

        <View className="flex-row items-center">
          {back && (
            <TouchableOpacity
              onPress={onPressBackButton}
              className="mr-3 items-center justify-center">
              <Ternary
                condition={Platform.OS === 'ios'}
                ifFalse={
                  <MaterialCommunityIcons
                    size={20}
                    name="arrow-left"
                    color={isDarkMode ? gray[200] : gray[950]}
                  />
                }
                ifTrue={
                  <MaterialCommunityIcons
                    size={30}
                    name="chevron-left"
                    color={isDarkMode ? gray[200] : gray[950]}
                  />
                }
              />
            </TouchableOpacity>
          )}
          {headerLeft && <View className="flex flex-row gap-x-2">{headerLeft}</View>}
        </View>

        <Reanimated.View
          entering={FadeIn.delay(200).duration(500)}
          className="flex-1 items-center justify-center">
          <Text size={'2xl'} weight={'extrabold'} align={'center'} className="uppercase">
            {options?.title ?? 'No Title'}
          </Text>
        </Reanimated.View>

        {headerRight && <View className="flex flex-row gap-x-2">{headerRight}</View>}
      </View>
    </Reanimated.View>
  );
};
