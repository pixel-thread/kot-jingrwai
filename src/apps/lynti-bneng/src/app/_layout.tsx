import "../../global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ErrorBoundary, TQueryProvider, ThemeProvider } from "@repo/ui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView>
        <ThemeProvider>
          <TQueryProvider>
            <StatusBar style="auto" />
            <SafeAreaProvider>
              <SafeAreaView className="flex-1 bg-gray-200 dark:bg-gray-900">
                <Stack screenOptions={{ headerShown: false }} />
              </SafeAreaView>
            </SafeAreaProvider>
          </TQueryProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
