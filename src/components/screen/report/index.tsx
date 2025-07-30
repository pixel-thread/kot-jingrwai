import { View, Alert, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useState, useEffect } from 'react';

export default function ReportScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const email = 'bimonlangb@gmail.com';

  // Animation values
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Delay showing content for smooth animation
    const timer = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const openEmail = async (subject: string, body: string) => {
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=jyrwaboys@gmial.com`;

    const supported = await Linking.canOpenURL(url);
    //@ts-ignore @eslint-disable-next-line
    supported ? Linking.openURL(url) : Alert.alert('Error', 'Email app is not available.');
  };

  return (
    <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-950">
      <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
        {contentVisible && (
          <>
            {/* Report Form Section */}
            <ReportSection title="Report an Issue">
              <View className="p-4">
                <Text className="mb-4 text-gray-700 dark:text-gray-300">
                  If you&apos;ve found an issue with the app or have suggestions for improvement,
                  please let us know. Your feedback helps us make the app better for everyone.
                </Text>
                <ReportItem
                  icon="bug-outline"
                  title="Report a Bug"
                  description="Found something not working correctly?"
                  onPress={() => openEmail('Bug Report', 'Found something not working correctly?')}
                />

                <ReportItem
                  icon="lightbulb-outline"
                  title="Suggest a Feature"
                  description="Have an idea to improve the app?"
                  onPress={() =>
                    openEmail('Feature Suggestion', 'Have an idea to improve the app?')
                  }
                />

                <ReportItem
                  icon="music-note-outline"
                  title="Report Missing Song"
                  description="Found a song that's missing or incorrect?"
                  onPress={() =>
                    openEmail('Missing Song Report', "Found a song that's missing or incorrect?")
                  }
                  isLast
                />
              </View>
            </ReportSection>

            {/* How to Report Section */}
            <ReportSection title="How to Report">
              <View className="p-4">
                <View className="flex-row items-start">
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={24}
                    color={isDarkMode ? '#93c5fd' : '#3b82f6'}
                    style={{ marginTop: 2 }}
                  />
                  <View className="ml-3 flex-1">
                    <Text weight="semibold" className="text-gray-800 dark:text-gray-100">
                      Reporting Guidelines
                    </Text>
                    <Text size="sm" className="mt-1 text-gray-500 dark:text-gray-400">
                      When reporting an issue, please include:
                    </Text>
                    <View className="mt-2">
                      <Text size="sm" className="text-gray-500 dark:text-gray-400">
                        • A clear description of the problem
                      </Text>
                      <Text size="sm" className="text-gray-500 dark:text-gray-400">
                        • Steps to reproduce the issue
                      </Text>
                      <Text size="sm" className="text-gray-500 dark:text-gray-400">
                        • Your device model and OS version
                      </Text>
                      <Text size="sm" className="text-gray-500 dark:text-gray-400">
                        • Screenshots (if applicable)
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ReportSection>

            {/* Footer */}
            <Reanimated.View entering={FadeInDown.delay(500).duration(500)} className="mb-4 mt-8">
              <Text className="text-center text-xs text-gray-500 dark:text-gray-500">
                © {new Date().getFullYear()} Kot Jingrwai. All rights reserved.
              </Text>
            </Reanimated.View>
          </>
        )}
      </Reanimated.View>
    </ScrollView>
  );
}

// Helper components
type ReportSectionProps = {
  title: string;
  children: React.ReactNode;
};

const ReportSection = ({ title, children }: ReportSectionProps) => {
  return (
    <Reanimated.View entering={FadeInDown.duration(500)} className="mb-6">
      <Text size="lg" weight={'bold'} className="mb-2 px-2 text-gray-800 dark:text-gray-200">
        {title}
      </Text>
      <View className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-800">
        {children}
      </View>
    </Reanimated.View>
  );
};

type ReportItemProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  description?: string;
  onPress?: () => void;
  isLast?: boolean;
};

const ReportItem = ({ icon, title, description, onPress, isLast }: ReportItemProps) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`border-gray-200 p-4 dark:border-gray-800 ${!isLast ? 'border-b' : ''}`}>
      <View className="flex-row items-center">
        <MaterialCommunityIcons name={icon} size={24} color={isDarkMode ? '#93c5fd' : '#3b82f6'} />
        <View className="ml-3 flex-1">
          <Text weight="semibold" className="text-gray-800 dark:text-gray-100">
            {title}
          </Text>
          {description && (
            <Text size="sm" className="text-gray-500 dark:text-gray-400">
              {description}
            </Text>
          )}
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={isDarkMode ? '#93c5fd' : '#3b82f6'}
        />
      </View>
    </TouchableOpacity>
  );
};
