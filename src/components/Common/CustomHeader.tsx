import { useRouter, usePathname, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Platform, TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';
import { Text } from '../ui/typography';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTextStore } from '~/src/libs/stores/text';
import { useEffect, useState } from 'react';
import { logger } from '~/src/utils/logger';
import { useSongs } from '~/src/hooks/song/useSongs';

type Props = {
  back?: {
    title: string | undefined;
    href: string | undefined;
  };
};

const routeTitleMap: Record<string, string> = {
  '/': 'Ka Kot Jingrwai',
  '/songs': 'Ki Jingrwai',
  '/chorus': 'Ki Khorus',
  '/about': 'Shaphang',
};

export const useHeaderTitle = (): { title: string } => {
  const pathname = usePathname();
  const params = useLocalSearchParams();
  const { song } = useSongs();
  const [title, setTitle] = useState<string>('Ka Kot Jingrwai');

  useEffect(() => {
    if (routeTitleMap[pathname]) {
      setTitle(routeTitleMap[pathname]);
      return;
    }

    // Dynamic page handling
    if (pathname.startsWith('/song')) {
      setTitle(`Jingrwai No ${song.metadata.number}`);
      return;
    }

    if (pathname.startsWith('/khorus/')) {
      const khorusNo = pathname.split('/khorus/')[1];
      setTitle(`Khorus ${khorusNo}`);
      return;
    }

    setTitle('Ka Kot Jingrwai'); // fallback
  }, [pathname, params, song]);

  return { title };
};

export const CustomHeader = ({ back }: Props) => {
  const router = useRouter();
  const { title } = useHeaderTitle();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { cycleTextSize } = useTextStore();

  const onPressBackButton = () => router.back();

  return (
    <View className="flex flex-row items-center justify-between bg-gray-200 p-2 px-4 dark:bg-gray-900">
      <View className="flex flex-row items-center gap-x-4">
        {back && Platform.OS === 'ios' && (
          <TouchableOpacity onPress={onPressBackButton}>
            <FontAwesome
              size={24}
              name="chevron-left"
              color={isDarkMode ? colors.gray[200] : colors.gray[950]}
            />
          </TouchableOpacity>
        )}
        <Text size={'2xl'} weight={'bold'} variant={'primary'} className="uppercase">
          {title}
        </Text>
      </View>
      <View className="flex flex-row gap-x-2">
        {back && (
          <TouchableOpacity onPress={cycleTextSize}>
            <Text size={'2xl'} weight={'bold'} variant={'primary'}>
              A+
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
