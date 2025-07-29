import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Platform, TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';
import { Text } from '../ui/typography';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { ReactNode } from 'react';
import { BetaBatch } from './BetaBatch';
import { logger } from '~/src/utils/logger';

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

  const onPressBackButton = () => router.back();
  return (
    <View className="flex flex-row items-center justify-between border-b border-gray-300/75 bg-gray-200 p-4 px-4 dark:border-gray-800 dark:bg-gray-950">
      {isBeta && <BetaBatch />}
      {headerLeft && <View className="flex flex-row gap-x-2">{headerLeft}</View>}
      <View className="flex flex-row items-center gap-x-4">
        {back && Platform.OS === 'ios' && (
          <TouchableOpacity onPress={onPressBackButton}>
            <FontAwesome
              size={20}
              name="arrow-left"
              color={isDarkMode ? colors.gray[200] : colors.gray[500]}
            />
          </TouchableOpacity>
        )}
        <Text size={'2xl'} weight={'bold'} variant={'primary'} className="uppercase">
          {options?.title ?? 'No Title'}
        </Text>
      </View>
      {headerRight && <View className="flex flex-row gap-x-2">{headerRight}</View>}
    </View>
  );
};
