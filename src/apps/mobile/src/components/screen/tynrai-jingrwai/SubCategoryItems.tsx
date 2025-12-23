import { View, TouchableOpacity } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

type SubCategoryItemProps = {
  title: string;
  range: string;
  onPress: () => void;
  isLast?: boolean;
};

export const SubCategoryItem = ({ title, range, onPress, isLast }: SubCategoryItemProps) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`border-gray-200 bg-gray-50 p-4 pl-6 dark:border-gray-800 dark:bg-gray-900 ${!isLast ? 'border-b' : ''}`}>
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start">
          <MaterialCommunityIcons
            name="bookmark-outline"
            size={20}
            color={isDarkMode ? '#93c5fd' : '#3b82f6'}
          />
          <View className="ml-2">
            <Text weight="medium" className="mb-1 text-gray-700 dark:text-gray-200">
              {title}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <Text size="sm" className="mr-2 text-gray-500 dark:text-gray-400">
            {range}
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={18}
            color={isDarkMode ? '#93c5fd' : '#3b82f6'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
