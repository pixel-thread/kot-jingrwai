import { Stack } from 'expo-router';
import { FloatingActionButtons } from '~/src/components/Common/FloatingActionButtons';
import { useTextStore } from '~/src/libs/stores/text';
import { gray } from 'tailwindcss/colors';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { useSongs } from '~/src/hooks/song/useSongs';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

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

export default function SongLayout() {
  const { song } = useSongs();

  return (
    <View className="flex-1" collapsable={false}>
      <Stack
        screenOptions={{
          headerShown: true,
          title: song.metadata.number.toString(),
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<HeaderRight />} />
          ),
        }}
      />

      <FloatingActionButtons />
    </View>
  );
}
