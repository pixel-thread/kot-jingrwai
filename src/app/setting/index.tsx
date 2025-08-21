import { router, Stack } from 'expo-router';
import { View, ScrollView, TouchableOpacity, Switch, Linking } from 'react-native';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import ThemeSelector from '~/src/components/Common/theme/ThemeSelector';
import { Text } from '~/src/components/ui/typography';
import { useState } from 'react';
import { useColorScheme } from 'nativewind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useTextStore } from '~/src/libs/stores/text';
import { ThemeToggle } from '~/src/components/Common/theme/ThemeToggle';
import { useUpdateContext } from '~/src/hooks/update/useUpdateContext';
import { ContentSection } from '~/src/components/Common/ContentSection';

export default function Settings() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { isUpdateAvailable, isUpdateLoading, refresh, appVersion, update } = useUpdateContext();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const { isSelectable: textSelectionEnabled, setIsSelectable: setTextSelectionEnabled } =
    useTextStore();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerBackVisible: true,
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<ThemeToggle />} />
          ),
        }}
      />
      <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-950">
        <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
          {/* Theme Section */}
          <ContentSection title="Theme">
            <ThemeSelector />
          </ContentSection>

          {/* App Preferences Section */}
          <ContentSection title="App Preferences">
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
              icon="bell-outline"
              title="Notifications"
              description="Receive updates and reminders"
              right={
                <Switch
                  disabled
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={notificationsEnabled ? '#3b82f6' : '#f4f3f4'}
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
                  disabled={true}
                  onValueChange={setAutoPlayEnabled}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={autoPlayEnabled ? '#3b82f6' : '#f4f3f4'}
                />
              }
            />
          </ContentSection>

          {/* App Info Section */}
          <ContentSection title="App Info">
            <SettingItem
              icon="information-outline"
              title="Version"
              description={`Current version: ${appVersion}`}
              right={
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={isUpdateLoading}
                    onPress={refresh}
                    className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <MaterialCommunityIcons
                      name={isUpdateLoading ? 'sync' : 'update'}
                      size={20}
                      color={isDarkMode ? '#3b82f6' : '#3b82f6'}
                    />
                  </TouchableOpacity>
                </>
              }
            />

            {isUpdateAvailable && (
              <Reanimated.View entering={FadeInDown.duration(500)}>
                <TouchableOpacity
                  className="mt-2 flex-row items-center justify-between rounded-xl bg-blue-100 p-3 dark:bg-blue-900"
                  onPress={() => Linking.openURL(update?.release_notes_url || '')}>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="download"
                      size={20}
                      color={isDarkMode ? '#93c5fd' : '#3b82f6'}
                    />
                    <Text className="ml-2 text-blue-700 dark:text-blue-300">Update Available!</Text>
                    <Text className="ml-2 text-blue-700 dark:text-blue-300">{update?.version}</Text>
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
              onPress={() => router.push('/setting/support')}
            />

            <SettingItem
              icon="shield-check-outline"
              title="Privacy Policy"
              description="Read our privacy policy"
              onPress={() => router.push('/setting/privacy')}
            />
          </ContentSection>
        </Reanimated.View>
      </ScrollView>
    </>
  );
}

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
  const { isUpdateAvailable } = useUpdateContext();
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
            {isUpdateAvailable && title === 'Version' && (
              <View className="absolute right-4 top-0 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500" />
            )}
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
