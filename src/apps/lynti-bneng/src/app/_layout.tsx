import "../../global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ErrorBoundary,
  TQueryProvider,
  Ternary,
  ThemeProvider,
  UpdateContextProvider,
} from "@repo/ui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { OtaUpdateBanner } from "@components/Common/OtaUpdateBanner";
import Onboarding from "@components/Onboarding";
import { useOnboardingStore } from "@repo/libs";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { hasCompletedOnboarding } = useOnboardingStore();

  useEffect(() => {
    setAppIsReady(true);
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

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <TQueryProvider>
              <UpdateContextProvider>
                <StatusBar style="auto" />
                <SafeAreaView className="flex-1 bg-gray-200 dark:bg-gray-900">
                  <OtaUpdateBanner
                    testMode={process.env.NODE_ENV === "development"}
                    scenario={"fail"}
                  />
                  <Ternary
                    condition={hasCompletedOnboarding}
                    ifTrue={<Stack screenOptions={{ headerShown: false }} />}
                    ifFalse={<Onboarding />}
                  />
                </SafeAreaView>
              </UpdateContextProvider>
            </TQueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
