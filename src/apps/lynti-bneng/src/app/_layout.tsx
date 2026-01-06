import '../../global.css';

import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ErrorBoundary } from '@repo/ui-native';

export default function Layout() {
  return (
    <ErrorBoundary>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-200 dark:bg-gray-900">
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
