import '../../global.css';

import { SongProvider } from '../components/Provider/Song';
import { StatusBar, useColorScheme, View } from 'react-native';
import { CustomStack } from '../components/Common/CustomStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme as useScheme } from 'nativewind';
import { useEffect, useState } from 'react';
export default function Layout() {
  const [isMounted, setIsMounted] = useState(false);
  const theme = useColorScheme();
  const { setColorScheme } = useScheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    setColorScheme(isDarkMode ? 'dark' : 'light');
    setIsMounted(true);
  }, [isDarkMode, setColorScheme]);

  if (!isMounted) {
    return null;
  }
  return (
    <SafeAreaProvider className="flex-1">
      <StatusBar className="bg-gray-200 dark:bg-gray-950 " />
      <SongProvider>
        <View className="flex-1 bg-gray-200 dark:bg-gray-950">
          <CustomStack />
        </View>
      </SongProvider>
    </SafeAreaProvider>
  );
}
