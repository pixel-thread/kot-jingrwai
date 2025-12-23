import { View, TouchableOpacity } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

type CategoryItemProps = {
  title: string;
  range: string;
  onPress: () => void;
  isLast?: boolean;
};

export const CategoryItem = ({ title, range, onPress, isLast }: CategoryItemProps) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 border-gray-200 p-4 dark:border-gray-800 ${!isLast ? 'border-b' : ''}`}>
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={24}
            color={isDarkMode ? '#93c5fd' : '#3b82f6'}
          />
          <View className="ml-3">
            <Text weight="semibold" className="mb-1 text-gray-800 dark:text-gray-100">
              {title}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <Text size="sm" className="mr-0 text-gray-500 dark:text-gray-400">
            {range}
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={isDarkMode ? '#93c5fd' : '#3b82f6'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
