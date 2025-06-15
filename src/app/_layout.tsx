import '../../global.css';

import { SongProvider } from '../components/Provider/Song';
import { StatusBar } from 'react-native';
import { CustomStack } from '../components/Common/CustomStack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme as useScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SplashScreen } from '../components/Common/SplashScreen';
import { Ternary } from '../components/Common/Ternary';

export default function Layout() {
  const [isMounted, setIsMounted] = useState(false);
  const { setColorScheme } = useScheme();

  useEffect(() => {
    setColorScheme('system');
  }, [setColorScheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider className="flex-1">
        <StatusBar className={'bg-gray-200 text-black dark:bg-gray-950 dark:text-gray-200'} />
        <SongProvider>
          <SafeAreaView className="flex-1 bg-gray-200 dark:bg-gray-950">
            <Ternary
              condition={isMounted}
              ifTrue={<CustomStack />}
              ifFalse={<SplashScreen onFinish={() => setIsMounted(true)} />}
            />
          </SafeAreaView>
        </SongProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
