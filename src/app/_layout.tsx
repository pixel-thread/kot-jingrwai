import '../../global.css';

import { SongProvider } from '../components/Provider/Song';
import { StatusBar } from 'react-native';
import { CustomStack } from '../components/Common/CustomStack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme as useScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SplashScreen } from '../components/Common/SplashScreen';

export default function Layout() {
  const [isMounted, setIsMounted] = useState(false);
  const { setColorScheme } = useScheme();

  useEffect(() => {
    if (!isMounted) {
      setColorScheme('system');
    }
  }, [setColorScheme, isMounted]);

  if (!isMounted) {
    return <SplashScreen onFinish={() => setIsMounted(true)} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider className="flex-1">
        <StatusBar className="bg-gray-200 text-black dark:bg-gray-950 dark:text-white" />
        <SongProvider>
          <SafeAreaView className="flex-1 bg-gray-200 dark:bg-gray-950">
            <CustomStack />
          </SafeAreaView>
        </SongProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
