import '~/src/styles/global.css';
import { SongProvider } from '../components/Provider/Song';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../components/Provider/theme';
import AppVersion from '../components/Common/AppVersion';
import { TQueryProvider } from '../components/Provider/query';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import { logger } from '../utils/logger';
import { useOnboardingStore } from '../libs/stores/onboarding';
import Onboarding from '../components/Onboarding';
import { Ternary } from '../components/Common/Ternary';
import { ErrorBoundary } from '../components/Common/ErrorBoundary';
import { UpdateContextProvider } from '../components/Provider/update';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { hasCompletedOnboarding } = useOnboardingStore();
  const [loaded, error] = useFonts({
    Helvetica: require('~/assets/fonts/Helvetica.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        logger.error(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady || !loaded || error) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" hidden />
        <SafeAreaView className="flex-1 bg-gray-200 dark:bg-gray-800">
          <TQueryProvider>
            <ErrorBoundary>
              <UpdateContextProvider>
                <ThemeProvider>
                  <SongProvider>
                    <Ternary
                      condition={!hasCompletedOnboarding}
                      ifTrue={<Onboarding />}
                      ifFalse={<Stack screenOptions={{ headerShown: false }} />}
                    />
                  </SongProvider>
                </ThemeProvider>
              </UpdateContextProvider>
            </ErrorBoundary>
          </TQueryProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
