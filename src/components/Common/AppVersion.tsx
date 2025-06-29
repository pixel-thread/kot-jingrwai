import { useEffect, useState } from 'react';
import { View, Modal, Linking, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAppVersionStore } from '~/src/libs/stores/appVersion';
import http from '~/src/utils/http';
import { AppUpdateT } from '~/src/types/AppVersion';
import { Text } from '~/src/components/ui/typography';
import { Button } from '../ui/button';
import { FlashList } from '@shopify/flash-list';
import Constants from 'expo-constants';
import { logger } from '~/src/utils/logger';

const AppVersion = () => {
  const { setPrevVersion, ignoredVersion, setIgnoredVersion } = useAppVersionStore();
  const appVersion = Constants.expoConfig?.version; // safer than manifest
  const [update, setUpdate] = useState<AppUpdateT | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data } = useQuery({
    queryKey: ['app-update'],
    queryFn: async () => http.get<AppUpdateT>('/kot-version'),
  });

  useEffect(() => {
    logger.log({
      error: data,
    });
    if (data?.success && data.data && appVersion) {
      const fetchedUpdate = data.data;
      const serverVersion = fetchedUpdate.version;
      const updatePlatforms = fetchedUpdate.platforms || [];
      const currentPlatform = Platform.OS;
      const isPlatformSupported = updatePlatforms.includes(currentPlatform);
      const isServerHigher = compareVersions(serverVersion, appVersion) > 0;

      if (isServerHigher && isPlatformSupported) {
        const userIgnoredThisVersion = ignoredVersion === serverVersion;

        if (fetchedUpdate.mandatory || !userIgnoredThisVersion) {
          setShowModal(true);
          setUpdate(fetchedUpdate);
        }
      } else {
        setShowModal(false);
      }
    }
  }, [data, appVersion, ignoredVersion]);

  const handleDismiss = () => {
    if (update?.version) {
      setIgnoredVersion(update.version);
      setPrevVersion(update.version);
    }
    setShowModal(false);
  };

  if (!update) return null;

  return (
    <Modal visible={showModal} transparent animationType="fade">
      <SafeAreaView className="flex-1 items-center justify-center bg-black/70">
        <View className="max-h-[80%] w-[90%] rounded-2xl bg-white p-6">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text weight="extrabold" variant="primary" size="2xl" className="text-center">
              {update.title}
            </Text>

            <DescriptionList description={update.description} />

            <View className="mt-5 border-t border-gray-200" />

            <View className="mt-4">
              <InfoRow label="Version" value={update.version} />
              <InfoList label="Platforms" data={update.platforms} />
              <InfoRow label="Released At" value={new Date(update.release_date).toLocaleString()} />
            </View>
          </ScrollView>

          <View className="mt-6">
            {update.mandatory ? (
              <Button
                title="Update Now"
                className="p-3"
                onPress={() => Linking.openURL(update.release_notes_url)}
              />
            ) : (
              <View className="flex flex-row justify-end gap-x-2">
                <Button
                  className="border border-red-500 bg-red-600/70 py-2"
                  onPress={handleDismiss}
                  title="Close"
                />
                <Button
                  title="Update"
                  className="py-2"
                  onPress={() => Linking.openURL(update.release_notes_url)}
                />
              </View>
            )}
          </View>
        </View>
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
  if (!description || description.length === 0) return null;
  return (
    <View className="mt-3">
      <Text size="md" className="font-bold capitalize">
        Release Notes:
      </Text>
      <View className="mt-1 gap-y-2 rounded-md bg-gray-100 p-2">
        {description.map((item, index) => (
          <View key={index} className="flex-row items-baseline gap-x-2">
            <Text>-</Text>
            <Text size={'sm'} className="text-gray-700">
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string | undefined }) => {
  if (!value) return null;
  return (
    <View className="mt-2 flex-row">
      <Text className="font-semibold">{label}:</Text>
      <Text className="ml-2 text-gray-600">{value}</Text>
    </View>
  );
};

const InfoList = ({ label, data }: { label: string; data?: string[] }) => {
  if (!data || data.length === 0) return null;
  return (
    <View className="mt-2">
      <Text className="font-semibold">{label}:</Text>
      <FlashList
        data={data}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => <Text className="capitalize text-gray-600">- {item}</Text>}
        estimatedItemSize={20}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default AppVersion;
