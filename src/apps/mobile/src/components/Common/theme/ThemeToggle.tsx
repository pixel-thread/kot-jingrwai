import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';
import { useThemeStore } from '~/src/libs/stores/theme';

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <TouchableOpacity
      onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-10 w-10 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-600/50">
      <MaterialIcons
        name={theme === 'light' ? 'dark-mode' : 'light-mode'}
        size={20}
        color={isDarkMode ? colors.gray[200] : colors.gray[950]}
      />
    </TouchableOpacity>
  );
};
