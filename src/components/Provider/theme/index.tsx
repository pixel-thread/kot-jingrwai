import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { useThemeStore } from '~/src/libs/stores/theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    if (theme) {
      setColorScheme(theme);
    }
  }, [theme, setColorScheme]);

  return <>{children}</>;
};
