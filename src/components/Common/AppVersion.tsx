import { useEffect, useState } from 'react';
import {
  View,
  Modal,
  Linking,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAppVersionStore } from '~/src/libs/stores/appVersion';
import http from '~/src/utils/http';
import { AppUpdateT } from '~/src/types/AppVersion';
import { Text } from '~/src/components/ui/typography';
import { Button } from '../ui/button';
import { FlashList } from '@shopify/flash-list';
import Constants from 'expo-constants';
import { useColorScheme } from 'nativewind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { logger } from '~/src/utils/logger';

const AppVersion = () => {
  const { setPrevVersion } = useAppVersionStore();
  const appVersion = Constants.expoConfig?.version; // safer than manifest
  const [update, setUpdate] = useState<AppUpdateT | null>();
  const [showModal, setShowModal] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const { data } = useQuery({
    queryKey: ['app-update'],
    queryFn: async () => http.get<AppUpdateT>('/kot-version'),
  });

  useEffect(() => {
    if (data?.success && data.data && appVersion) {
      const fetchedUpdate = data.data;
      const serverVersion = fetchedUpdate.version;
      const updatePlatforms = fetchedUpdate.platforms || [];
      const currentPlatform = Platform.OS;
      const isPlatformSupported = updatePlatforms.includes(currentPlatform);
      const isServerHigher = compareVersions(serverVersion, appVersion) > 0;

      if (isServerHigher && isPlatformSupported) {
        // Always show update notification when server version is higher
        setShowModal(true);
        setUpdate(fetchedUpdate);
        // Delay showing content for smooth animation
        setTimeout(() => setContentVisible(true), 300);
      } else {
        setShowModal(false);
      }
    }
  }, [data, appVersion]);

  const handleDismiss = () => {
    if (update?.version) {
      setPrevVersion(update.version);
    }
    setShowModal(false);
  };

  logger.error(data);
  if (!update) return null;

  return (
    <Modal visible={showModal} transparent animationType="fade">
      <SafeAreaView className="flex-1 items-center justify-center bg-black/70">
        <Reanimated.View
          entering={FadeIn.duration(500)}
          className="max-h-[80%] w-[90%] overflow-hidden rounded-2xl bg-white p-6 dark:bg-gray-900">
          {contentVisible && (
            <>
              <Reanimated.View entering={FadeInDown.duration(500)}>
                <Text
                  weight="extrabold"
                  size="2xl"
                  className="text-center text-gray-800 dark:text-gray-100">
                  {update.title}
                </Text>

                <DescriptionList description={update.description} />

                <View className="mt-5 border-t border-gray-200 dark:border-gray-700" />

                <ScrollView className="max-h-[300px]" showsVerticalScrollIndicator={false}>
                  <View className="mt-4">
                    <VersionInfoSection update={update} />
                  </View>
                </ScrollView>
              </Reanimated.View>

              <Reanimated.View entering={FadeInDown.delay(300).duration(500)} className="mt-6">
                {update.mandatory ? (
                  <TouchableOpacity
                    className="rounded-lg bg-indigo-500 p-3 text-center text-white dark:bg-indigo-600"
                    onPress={() => Linking.openURL(update.release_notes_url)}>
                    <Text align={'center'} weight={'bold'} className="uppercase text-white">
                      Update Now
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View className="flex flex-row items-center justify-end gap-x-2">
                    <Button
                      className="border border-red-500 bg-red-600/70 py-2 dark:border-red-700 dark:bg-red-900/70"
                      onPress={handleDismiss}
                      title="Close"
                    />
                    <TouchableOpacity
                      className="rounded-lg bg-indigo-500 p-3 text-white dark:bg-indigo-600"
                      onPress={() => Linking.openURL(update.release_notes_url)}>
                      <Text className="text-white" weight={'bold'}>
                        Update
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Reanimated.View>
            </>
          )}
        </Reanimated.View>
      </SafeAreaView>
    </Modal>
  );
};

/**
 * Compare two semantic versions
 * Returns:
 * - 1 if v1 > v2
 * - -1 if v1 < v2
 * - 0 if equal
 */
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

const DescriptionList = ({ description }: { description?: string[] }) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  if (!description || description.length === 0) return null;
  return (
    <Reanimated.View entering={FadeInDown.delay(100).duration(500)} className="mt-4">
      <Text size="md" weight="bold" className="capitalize text-gray-800 dark:text-gray-200">
        Release Notes:
      </Text>
      <View className="mt-2 gap-y-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        {description.map((item, index) => (
          <Reanimated.View
            key={index}
            entering={FadeInDown.delay(150 + index * 50).duration(400)}
            className="flex-row items-baseline gap-x-2">
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={16}
              color={isDarkMode ? '#93c5fd' : '#3b82f6'}
            />
            <Text size={'sm'} className="flex-1 text-gray-700 dark:text-gray-300">
              {item}
            </Text>
          </Reanimated.View>
        ))}
      </View>
    </Reanimated.View>
  );
};

const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | undefined;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  if (!value) return null;
  return (
    <View className="mt-3 flex-row items-center">
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={isDarkMode ? '#93c5fd' : '#3b82f6'}
          style={{ marginRight: 8 }}
        />
      )}
      <Text weight="semibold" className="text-gray-800 dark:text-gray-200">
        {label}:
      </Text>
      <Text className="ml-2 text-gray-600 dark:text-gray-400">{value}</Text>
    </View>
  );
};

const InfoList = ({
  label,
  data,
  icon,
}: {
  label: string;
  data?: string[];
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  if (!data || data.length === 0) return null;
  return (
    <View className="mt-3">
      <View className="flex-row items-center">
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={isDarkMode ? '#93c5fd' : '#3b82f6'}
            style={{ marginRight: 8 }}
          />
        )}
        <Text weight="semibold" className="text-gray-800 dark:text-gray-200">
          {label}:
        </Text>
      </View>
      <View className="ml-7 mt-1">
        <FlashList
          data={data}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View className="flex-row items-center py-1">
              <MaterialCommunityIcons
                name="circle-small"
                size={16}
                color={isDarkMode ? '#93c5fd' : '#3b82f6'}
              />
              <Text className="capitalize text-gray-600 dark:text-gray-400">{item}</Text>
            </View>
          )}
          estimatedItemSize={20}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const VersionInfoSection = ({ update }: { update: AppUpdateT }) => {
  return (
    <Reanimated.View entering={FadeInDown.delay(200).duration(500)} className="space-y-2">
      <InfoRow icon="tag-outline" label="Version" value={update.version} />
      <InfoList icon="devices" label="Platforms" data={update.platforms} />
      <InfoRow
        icon="calendar-outline"
        label="Released At"
        value={new Date(update.release_date).toLocaleString()}
      />
      {update.author && <InfoRow icon="account-outline" label="Author" value={update.author} />}
      {update.additional_info?.estimated_downtime && (
        <InfoRow
          icon="clock-outline"
          label="Estimated Downtime"
          value={update.additional_info.estimated_downtime}
        />
      )}
      {update.tags && update.tags.length > 0 && (
        <InfoList icon="tag-multiple-outline" label="Tags" data={update.tags} />
      )}
    </Reanimated.View>
  );
};

export default AppVersion;
