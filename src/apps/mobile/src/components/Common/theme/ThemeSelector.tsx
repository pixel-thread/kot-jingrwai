import { View, TouchableOpacity } from 'react-native';
import { Text } from '@repo/ui-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '~/src/libs/stores/theme';
import { cn } from '~/src/libs/cn';

type Theme = 'light' | 'dark' | 'system';

const ThemeSelector = () => {
  const { theme: selected, setTheme } = useThemeStore();
  const themes: Theme[] = ['light', 'dark', 'system'];

  const getIcon = (theme: Theme) => {
    switch (theme) {
      case 'light':
        return 'sunny-outline';
      case 'dark':
        return 'moon-outline';
      case 'system':
        return 'phone-portrait-outline';
    }
  };

  return (
    <View className="rounded-xl border border-gray-300 dark:border-gray-800">
      {themes.map((theme, index) => {
        const isSelected = selected === theme;

        return (
          <TouchableOpacity
            key={theme}
            onPress={() => setTheme(theme)}
            className={cn(
              'flex-row items-center justify-between p-4',
              index < themes.length - 1 && 'border-b border-gray-200 dark:border-gray-800',
              isSelected && 'bg-gray-300 dark:bg-gray-800',
              isSelected && index === themes.length - 1 && 'rounded-b-xl',
              isSelected && index === 0 && 'rounded-t-xl'
            )}>
            <View className="flex-row items-center">
              <Ionicons
                name={getIcon(theme)}
                size={20}
                color={isSelected ? '#3b82f6' : '#6b7280'}
              />
              <Text
                className={cn(
                  'ml-3',
                  isSelected
                    ? 'font-medium text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-gray-100'
                )}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </Text>
            </View>

            {isSelected && <Ionicons name="checkmark" size={20} color="#3b82f6" />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ThemeSelector;
