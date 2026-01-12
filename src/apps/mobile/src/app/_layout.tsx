import "~/src/styles/global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  ThemeProvider,
  TQueryProvider,
  Ternary,
  ErrorBoundary,
  UpdateContextProvider,
} from "@repo/ui-native";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useOnboardingStore } from "@repo/libs";
import Onboarding from "~/src/components/Onboarding";
import { OtaUpdateBanner } from "~/src/components/Common/OtaUpdateBanner";
import { logger } from "@repo/utils";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { hasCompletedOnboarding } = useOnboardingStore();

  useEffect(() => {
    setAppIsReady(true);
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    logger.info("App not ready");
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" translucent />
        <SafeAreaView className="flex-1 bg-gray-200 dark:bg-gray-900">
          <TQueryProvider>
            <ErrorBoundary>
              <UpdateContextProvider>
                <ThemeProvider>
                  <OtaUpdateBanner
                    testMode={process.env.NODE_ENV === "development"}
                    scenario={"fail"}
                  />
                  <Ternary
                    condition={!hasCompletedOnboarding}
                    ifTrue={<Onboarding />}
                    ifFalse={<Stack screenOptions={{ headerShown: false }} />}
                  />
                </ThemeProvider>
              </UpdateContextProvider>
            </ErrorBoundary>
          </TQueryProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
