import { Stack } from 'expo-router';
import { View, ScrollView, TouchableOpacity, Switch, Linking } from 'react-native';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import ThemeSelector from '~/src/components/Common/ThemeSelector';
import { Text } from '~/src/components/ui/typography';
import { useState, useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useQuery } from '@tanstack/react-query';
import http from '~/src/utils/http';
import { AppUpdateT } from '~/src/types/AppVersion';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function Settings() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const appVersion = Constants.expoConfig?.version || '1.0.0';
  // Dummy settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [textSelectionEnabled, setTextSelectionEnabled] = useState(true);

  // Version check
  const {
    data: versionData,

    refetch,
  } = useQuery({
    queryKey: ['app-version-check'],
    queryFn: async () => http.get<AppUpdateT>('/kot-version'),
    enabled: true,
  });

  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    if (versionData?.success && versionData.data) {
      const serverVersion = versionData.data.version;
      setHasUpdate(compareVersions(serverVersion, appVersion) > 0);
    }
  }, [versionData, appVersion]);

  // Compare two semantic versions
  function compareVersions(v1: string, v2: string): number {
    const s1 = v1.split('.').map(Number);
    const s2 = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(s1.length, s2.length); i++) {
      const num1 = s1[i] || 0;
      const num2 = s2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  }

  const checkForUpdates = () => {
    refetch();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerBackVisible: true,
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
          header: ({ options }) => <CustomHeader options={options} back />,
        }}
      />
      <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-950">
        <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
          {/* Theme Section */}
          <SettingSection title="Theme">
            <ThemeSelector />
          </SettingSection>

          {/* App Preferences Section */}
          <SettingSection title="App Preferences">
            <SettingItem
              icon="bell-outline"
              title="Notifications"
              description="Receive updates and reminders"
              right={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={notificationsEnabled ? '#3b82f6' : '#f4f3f4'}
                />
              }
            />

            <SettingItem
              icon="text-box-outline"
              title="Text Selection"
              description="Allow selecting and copying text"
              right={
                <Switch
                  value={textSelectionEnabled}
                  onValueChange={setTextSelectionEnabled}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={textSelectionEnabled ? '#3b82f6' : '#f4f3f4'}
                />
              }
            />

            <SettingItem
              icon="play-circle-outline"
              title="Auto Play"
              description="Automatically play songs when opened"
              right={
                <Switch
                  value={autoPlayEnabled}
                  onValueChange={setAutoPlayEnabled}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={autoPlayEnabled ? '#3b82f6' : '#f4f3f4'}
                />
              }
            />
          </SettingSection>

          {/* App Info Section */}
          <SettingSection title="App Info">
            <SettingItem
              icon="information-outline"
              title="Version"
              description={`Current version: ${appVersion}`}
              right={
                <TouchableOpacity
                  onPress={checkForUpdates}
                  className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <MaterialCommunityIcons
                    name="update"
                    size={20}
                    color={isDarkMode ? '#3b82f6' : '#3b82f6'}
                  />
                </TouchableOpacity>
              }
            />

            {hasUpdate && (
              <Reanimated.View entering={FadeInDown.duration(500)}>
                <TouchableOpacity
                  className="mt-2 flex-row items-center justify-between rounded-xl bg-blue-100 p-3 dark:bg-blue-900"
                  onPress={() =>
                    Linking.openURL('https://github.com/yourusername/kot-ong-rwai/releases')
                  }>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="download"
                      size={20}
                      color={isDarkMode ? '#93c5fd' : '#3b82f6'}
                    />
                    <Text className="ml-2 text-blue-700 dark:text-blue-300">Update Available!</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color={isDarkMode ? '#93c5fd' : '#3b82f6'}
                  />
                </TouchableOpacity>
              </Reanimated.View>
            )}

            <SettingItem
              icon="help-circle-outline"
              title="Help & Support"
              description="Get assistance with the app"
              onPress={() => {}}
            />

            <SettingItem
              icon="shield-check-outline"
              title="Privacy Policy"
              description="Read our privacy policy"
              onPress={() => {}}
            />
          </SettingSection>
        </Reanimated.View>
      </ScrollView>
    </>
  );
}

// Helper components
type SettingSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingSection = ({ title, children }: SettingSectionProps) => {
  return (
    <View className="mb-6">
      <Text size="lg" weight={'bold'} className="mb-2 px-2 text-gray-800 dark:text-gray-200">
        {title}
      </Text>
      <View className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-800">
        {children}
      </View>
    </View>
  );
};

type SettingItemProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  description?: string;
  right?: React.ReactNode;
  onPress?: () => void;
};

const SettingItem = ({ icon, title, description, right, onPress }: SettingItemProps) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container className="border-b border-gray-200 p-4 dark:border-gray-800" onPress={onPress}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={isDarkMode ? '#93c5fd' : '#3b82f6'}
          />
          <View className="ml-3">
            <Text weight="semibold" className="text-gray-800 dark:text-gray-100">
              {title}
            </Text>
            {description && (
              <Text size="sm" className="text-gray-500 dark:text-gray-400">
                {description}
              </Text>
            )}
          </View>
        </View>
        {right}
      </View>
    </Container>
  );
};
