import {
  View,
  Modal,
  Linking,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { AppUpdateT } from "@repo/types";
import { Text } from "../typography";
import { useColorScheme } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Reanimated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
  ZoomIn,
} from "react-native-reanimated";
import { useUpdateContext } from "@repo/hooks";
import { compareAppVersions } from "@repo/utils";

export const AppVersion = () => {
  const context = useUpdateContext();

  if (!context || typeof context !== "object") {
    return null;
  }

  const { isUpdateAvailable, isShowUpdateDialog, update, dismiss, currentAppVersion } = context;

  const { colorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  if (!isUpdateAvailable || !update) return null;

  const isBelowMinVersion = compareAppVersions(currentAppVersion, update.minSupportedVersion);

  const isMandatory = update.type === "PTA" || isBelowMinVersion;

  const onUpdatePress = async () => {
    await Linking.canOpenURL(update.downloadUrl || "").then((supported) => {
      if (supported) {
        Linking.openURL(update.downloadUrl || "");
      }
    });
    return;
  };

  return (
    <Modal
      visible={isShowUpdateDialog}
      transparent
      animationType="fade"
      statusBarTranslucent
      hardwareAccelerated>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      {/* Backdrop */}
      <View className="flex-1 items-center justify-center bg-black/80 px-5">
        <SafeAreaView className="w-full max-w-md">
          <Reanimated.View
            entering={SlideInDown.springify().damping(15).stiffness(100)}
            className="overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900">
            {/* Header */}
            <View className="bg-indigo-600 px-6 pb-8 pt-10 dark:bg-indigo-700">
              <Reanimated.View
                entering={ZoomIn.delay(200).springify()}
                className="mb-4 items-center">
                <View className="rounded-full bg-white/20 p-4">
                  <MaterialCommunityIcons name="download-circle" size={48} color="#ffffff" />
                </View>
              </Reanimated.View>

              <Reanimated.View entering={FadeInUp.delay(300).duration(500)}>
                <Text
                  weight="extrabold"
                  size="2xl"
                  className="text-center text-white"
                  numberOfLines={2}>
                  {update.title}
                </Text>
                <View className="mt-3 flex-row items-center justify-center gap-2">
                  <View className="rounded-full bg-white/30 px-3 py-1">
                    <Text weight="semibold" className="text-sm text-white">
                      v{update.version}
                    </Text>
                  </View>
                  {isMandatory && (
                    <View className="rounded-full bg-red-500 px-3 py-1">
                      <Text weight="semibold" className="text-xs text-white">
                        REQUIRED
                      </Text>
                    </View>
                  )}
                </View>
              </Reanimated.View>
            </View>

            {/* Content Section */}
            <ScrollView
              className="max-h-[400px] px-6"
              showsVerticalScrollIndicator={false}
              bounces={false}>
              <View className="py-6">
                {/* Description Section */}
                {update.description && update.description.length > 0 && (
                  <DescriptionList description={update.description} />
                )}

                {/* Divider */}
                <View className="my-5 border-t border-gray-200 dark:border-gray-700" />

                {/* Version Info */}
                <VersionInfoSection update={update} />

                {/* Update Type Badge */}
                <Reanimated.View entering={FadeInDown.delay(400).duration(500)} className="mt-4">
                  <UpdateTypeBadge type={update.type} />
                </Reanimated.View>
              </View>
            </ScrollView>

            {/* Footer Actions */}
            <Reanimated.View
              entering={FadeInDown.delay(500).duration(500)}
              className="border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-950">
              {update.type === "PTA" ? (
                <TouchableOpacity
                  onPress={onUpdatePress}
                  className="flex-row items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 shadow-lg active:bg-indigo-700 dark:bg-indigo-700">
                  <MaterialCommunityIcons name="download" size={20} color="#ffffff" />
                  <Text weight="bold" className="text-base uppercase text-white">
                    Download Update
                  </Text>
                </TouchableOpacity>
              ) : (
                <View className="flex-row items-center gap-3">
                  {!isMandatory && (
                    <TouchableOpacity
                      onPress={() => dismiss()}
                      className="flex-1 rounded-xl border-2 border-gray-300 bg-white py-3.5 active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700">
                      <Text
                        weight="semibold"
                        className="text-center text-gray-700 dark:text-gray-300">
                        Later
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={onUpdatePress}
                    className={`flex-row items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 shadow-lg active:bg-indigo-700 dark:bg-indigo-700 ${!isMandatory ? "flex-1" : "flex-1"}`}>
                    <MaterialCommunityIcons name="update" size={20} color="#ffffff" />
                    <Text weight="bold" className="text-base text-white">
                      Update Now
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Security Note */}
              {isMandatory && (
                <Reanimated.View
                  entering={FadeIn.delay(600).duration(400)}
                  className="mt-3 flex-row items-center justify-center gap-2 rounded-lg bg-amber-50 p-2 dark:bg-amber-950/30">
                  <MaterialCommunityIcons
                    name="shield-alert"
                    size={16}
                    color={isDarkMode ? "#fbbf24" : "#f59e0b"}
                  />
                  <Text className="text-xs text-amber-700 dark:text-amber-400">
                    This update is required for security
                  </Text>
                </Reanimated.View>
              )}
            </Reanimated.View>
          </Reanimated.View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const DescriptionList = ({ description }: { description: string[] }) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <Reanimated.View entering={FadeInDown.delay(100).duration(500)}>
      <Text weight="bold" className="mb-3 text-gray-800 dark:text-gray-200">
        {"What's"} New:
      </Text>
      <View className="gap-y-3">
        {description.map((item, index) => (
          <Reanimated.View
            key={index}
            entering={FadeInDown.delay(150 + index * 80).duration(400)}
            className="flex-row items-start gap-3">
            <View className="mt-0.5 rounded-full bg-indigo-100 p-1 dark:bg-indigo-900/40">
              <MaterialCommunityIcons
                name="check-bold"
                size={12}
                color={isDarkMode ? "#a78bfa" : "#6366f1"}
              />
            </View>
            <Text className="flex-1 leading-6 text-gray-700 dark:text-gray-300">{item}</Text>
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
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  if (!value) return null;

  return (
    <View className="flex-row items-center rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
      {icon && (
        <View className="mr-3 rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900/40">
          <MaterialCommunityIcons
            name={icon}
            size={18}
            color={isDarkMode ? "#a78bfa" : "#6366f1"}
          />
        </View>
      )}
      <View className="flex-1">
        <Text className="text-xs text-gray-500 dark:text-gray-400">{label}</Text>
        <Text weight="medium" className="mt-0.5 text-gray-800 dark:text-gray-200">
          {value}
        </Text>
      </View>
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
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  if (!data || data.length === 0) return null;

  return (
    <View className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
      <View className="mb-2 flex-row items-center">
        {icon && (
          <View className="mr-2 rounded-lg bg-indigo-100 p-1.5 dark:bg-indigo-900/40">
            <MaterialCommunityIcons
              name={icon}
              size={16}
              color={isDarkMode ? "#a78bfa" : "#6366f1"}
            />
          </View>
        )}
        <Text className="text-xs text-gray-500 dark:text-gray-400">{label}</Text>
      </View>
      <View className="flex-row flex-wrap gap-2">
        {data.map((item, index) => (
          <View key={index} className="rounded-full bg-indigo-100 px-3 py-1 dark:bg-indigo-900/40">
            <Text className="text-xs font-medium leading-loose text-indigo-700 dark:text-indigo-300">
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const UpdateTypeBadge = ({ type }: { type: string }) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const isPTA = type === "PTA";

  return (
    <View className="flex-row items-center justify-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
      <MaterialCommunityIcons
        name={isPTA ? "store-outline" : "cloud-download-outline"}
        size={20}
        color={isDarkMode ? "#a78bfa" : "#6366f1"}
      />
      <Text weight="semibold" className="text-gray-700 dark:text-gray-300">
        {isPTA ? "App Store Update" : "Over-the-Air Update"}
      </Text>
    </View>
  );
};

const VersionInfoSection = ({ update }: { update: AppUpdateT }) => {
  return (
    <Reanimated.View entering={FadeInDown.delay(200).duration(500)} className="gap-y-3">
      <InfoRow icon="tag-outline" label="Current Version" value={update.version} />

      {update.minSupportedVersion && (
        <InfoRow
          icon="shield-check-outline"
          label="Minimum Supported"
          value={update.minSupportedVersion}
        />
      )}

      {update.platforms && update.platforms.length > 0 && (
        <InfoList icon="devices" label="Platforms" data={update.platforms} />
      )}

      <InfoRow
        icon="calendar-outline"
        label="Release Date"
        value={new Date(update.releaseDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />

      {update.author && (
        <InfoRow icon="account-outline" label="Released by" value={update.author} />
      )}

      {update.tags && update.tags.length > 0 && (
        <InfoList icon="tag-multiple-outline" label="Tags" data={update.tags} />
      )}
    </Reanimated.View>
  );
};
