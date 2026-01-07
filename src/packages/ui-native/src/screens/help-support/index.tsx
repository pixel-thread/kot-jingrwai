import { View, ScrollView, TouchableOpacity, Linking } from "react-native";
import { ContentSection } from "../../common";
import { Text } from "../../typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import Reanimated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useState, useEffect } from "react";

export function HelpSupportScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Animation values
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Delay showing content for smooth animation
    const timer = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEmailSupport = () => {
    Linking.openURL(
      "mailto:bimonlangb@gmail.com?subject=Help%20Request%20-%20Kot%20Jingrwai%20App"
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-950">
      <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
        {contentVisible && (
          <>
            {/* Introduction Section */}
            <ContentSection title="Help & Support">
              <View className="p-4">
                <Text className="mb-4 text-gray-700 dark:text-gray-300">
                  Welcome to the Kot Jingrwai App Help & Support Center. Here you&apos;ll find
                  answers to common questions, troubleshooting tips, and ways to contact our support
                  team.
                </Text>
              </View>
            </ContentSection>

            {/* Frequently Asked Questions */}
            <ContentSection title="Frequently Asked Questions">
              <FaqItem
                question="How do I search for songs?"
                answer="You can search for songs by tapping on the search icon in the Songs tab and entering the song title, number, or keywords. The app will display matching results as you type."
              />

              <FaqItem
                question="Can I use the app offline?"
                answer="Yes, once you've opened the app with an internet connection, all songs and content will be available offline. Updates to the song database require an internet connection."
              />

              <FaqItem
                question="How do I change the app theme?"
                answer="Go to Settings and select the Theme option. You can choose between Light, Dark, or System Default themes."
              />

              <FaqItem
                question="How do I report a mistake in a song?"
                answer="Go to the Report section in the app menu and select 'Report a Song Issue'. Provide details about the song and the correction needed."
                isLast
              />
            </ContentSection>

            {/* Troubleshooting */}
            <ContentSection title="Troubleshooting">
              <HelpItem
                icon="refresh"
                title="App Not Loading Properly"
                content="Try closing and reopening the app. If the issue persists, restart your device. If that doesn't work, try uninstalling and reinstalling the app."
              />

              <HelpItem
                icon="database-off-outline"
                title="Songs Not Displaying"
                content="Check your internet connection and try refreshing the app. If you're offline, make sure you've previously loaded the songs with an active connection."
              />

              <HelpItem
                icon="update"
                title="App Crashes"
                content="Make sure your app is updated to the latest version. Clear the app cache from your device settings. If problems persist, contact our support team."
                isLast
              />
            </ContentSection>

            {/* Contact Support */}
            <ContentSection title="Contact Support">
              <View className="p-4">
                <Text className="mb-4 text-gray-700 dark:text-gray-300">
                  If you couldn&apos;t find the answer to your question, please contact our support
                  team. We&apos;re here to help!
                </Text>

                <TouchableOpacity
                  onPress={handleEmailSupport}
                  className="mb-4 flex-row items-center rounded-xl bg-blue-100 p-4 dark:bg-blue-900">
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color={isDarkMode ? "#93c5fd" : "#3b82f6"}
                  />
                  <View className="ml-3">
                    <Text weight="semibold" className="text-blue-700 dark:text-blue-300">
                      Email Support
                    </Text>
                    <Text size="sm" className="text-blue-600 dark:text-blue-400">
                      bimonlangb@gmail.com
                    </Text>
                  </View>
                </TouchableOpacity>

                <View className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={24}
                      color={isDarkMode ? "#93c5fd" : "#3b82f6"}
                    />
                    <Text weight="semibold" className="ml-3 text-gray-800 dark:text-gray-100">
                      Response Time
                    </Text>
                  </View>
                  <Text size="sm" className="mt-2 text-gray-600 dark:text-gray-400">
                    We typically respond to support requests within 24-48 hours during business
                    days.
                  </Text>
                </View>
              </View>
            </ContentSection>

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

type HelpItemProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  content: string;
  isLast?: boolean;
};

const HelpItem = ({ icon, title, content, isLast }: HelpItemProps) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <View className={`border-gray-200 p-4 dark:border-gray-800 ${!isLast ? "border-b" : ""}`}>
      <View className="flex-row items-start">
        <MaterialCommunityIcons name={icon} size={24} color={isDarkMode ? "#93c5fd" : "#3b82f6"} />
        <View className="ml-3 flex-1">
          <Text weight="semibold" className="mb-1 text-gray-800 dark:text-gray-100">
            {title}
          </Text>
          <Text size="sm" className="text-gray-500 dark:text-gray-400">
            {content}
          </Text>
        </View>
      </View>
    </View>
  );
};

type FaqItemProps = {
  question: string;
  answer: string;
  isLast?: boolean;
};

const FaqItem = ({ question, answer, isLast }: FaqItemProps) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <View className={`border-gray-200 p-4 dark:border-gray-800 ${!isLast ? "border-b" : ""}`}>
      <View className="flex-row items-start">
        <MaterialCommunityIcons
          name="help-circle-outline"
          size={24}
          color={isDarkMode ? "#93c5fd" : "#3b82f6"}
        />
        <View className="ml-3 flex-1">
          <Text weight="semibold" className="mb-1 text-gray-800 dark:text-gray-100">
            {question}
          </Text>
          <Text size="sm" className="text-gray-500 dark:text-gray-400">
            {answer}
          </Text>
        </View>
      </View>
    </View>
  );
};
