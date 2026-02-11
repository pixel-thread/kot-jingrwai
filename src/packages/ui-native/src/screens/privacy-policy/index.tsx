import { View, ScrollView } from "react-native";
import { ContentSection } from "../../common";
import { Text } from "../../ui/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import Reanimated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useState, useEffect } from "react";

export function PrivacyPolicyScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const lastUpdated = "May 15, 2023";

  // Animation values
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Delay showing content for smooth animation
    const timer = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-950">
      <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
        {contentVisible && (
          <>
            {/* Introduction Section */}
            <ContentSection title="Privacy Policy">
              <View className="p-4">
                <Text className="mb-4 text-gray-700 dark:text-gray-300">
                  Kot Jingrwai {"(\"we,\" \"our,\" or \"us\")"} is committed to protecting your privacy.
                  This Privacy Policy explains how your personal information is collected, used, and
                  disclosed by Kot Jingrwai.
                </Text>
                <Text className="mb-4 text-gray-700 dark:text-gray-300">
                  This Privacy Policy applies to our mobile application, and its associated services
                  {"(collectively, our \"Service\")"}. By accessing or using our Service, you signify
                  that you have read, understood, and agree to our collection, storage, use, and
                  disclosure of your personal information as described in this Privacy Policy.
                </Text>
                <View className="flex-row items-center justify-end">
                  <MaterialCommunityIcons
                    name="calendar-outline"
                    size={16}
                    color={isDarkMode ? "#93c5fd" : "#3b82f6"}
                    style={{ marginRight: 4 }}
                  />
                  <Text size="sm" className="text-gray-500 dark:text-gray-400">
                    Last Updated: {lastUpdated}
                  </Text>
                </View>
              </View>
            </ContentSection>

            {/* Information We Collect */}
            <ContentSection title="Information We Collect">
              <PolicyItem
                icon="information-outline"
                title="Personal Information"
                content="We may collect personal information that you provide to us, such as your name and email address when you contact us for support or feedback."
              />

              <PolicyItem
                icon="cellphone"
                title="Device Information"
                content="When you access our Service, we automatically collect information about your device, including your device model, operating system, unique device identifiers, and mobile network information."
              />

              <PolicyItem
                icon="chart-bar"
                title="Usage Data"
                content="We collect information about how you use our app, including which features you use most frequently, song preferences, and other interaction data to improve our service."
                isLast
              />
            </ContentSection>

            {/* How We Use Information */}
            <ContentSection title="How We Use Your Information">
              <View className="p-4">
                <View className="flex-row items-start">
                  <MaterialCommunityIcons
                    name="shield-check-outline"
                    size={24}
                    color={isDarkMode ? "#93c5fd" : "#3b82f6"}
                    style={{ marginTop: 2 }}
                  />
                  <View className="ml-3 flex-1">
                    <Text weight="semibold" className="text-gray-800 dark:text-gray-100">
                      We use your information to:
                    </Text>
                    <View className="mt-2">
                      <Text size="sm" className="text-gray-500 dark:text-gray-400">
                        • Provide, maintain, and improve our Services
                      </Text>
                      <Text size="sm" className="text-gray-500 dark:text-gray-400">
                        • Develop new products and services
                      </Text>
                      <Text size="sm" className="text-gray-500 dark:text-gray-400">
                        • Respond to your comments and questions
                      </Text>
                      <Text size="sm" className="text-gray-500 dark:text-gray-400">
                        • Send you related information, including confirmations, updates, and alerts
                      </Text>
                      <Text size="sm" className="text-gray-500 dark:text-gray-400">
                        • Monitor and analyze trends, usage, and activities
                      </Text>
                      <Text size="sm" className="text-gray-500 dark:text-gray-400">
                        • Detect, investigate, and prevent fraudulent transactions and other illegal
                        activities
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ContentSection>

            {/* Data Sharing */}
            <ContentSection title="Sharing Your Information">
              <PolicyItem
                icon="account-group-outline"
                title="Third-Party Service Providers"
                content="We may share your information with third-party vendors, service providers, and other third parties who perform services on our behalf, such as analytics providers and customer service support."
              />

              <PolicyItem
                icon="gavel"
                title="Legal Requirements"
                content="We may disclose your information where required to do so by law or subpoena or if we believe that such action is necessary to comply with the law and the reasonable requests of law enforcement."
              />

              <PolicyItem
                icon="handshake"
                title="Business Transfers"
                content="If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction."
                isLast
              />
            </ContentSection>

            {/* Data Security */}
            <ContentSection title="Data Security">
              <View className="p-4">
                <Text className="mb-4 text-gray-700 dark:text-gray-300">
                  We use administrative, technical, and physical security measures to help protect
                  your personal information. While we have taken reasonable steps to secure the
                  personal information you provide to us, please be aware that despite our efforts,
                  no security measures are perfect or impenetrable, and no method of data
                  transmission can be guaranteed against any interception or other type of misuse.
                </Text>
              </View>
            </ContentSection>

            {/* Your Rights */}
            <ContentSection title="Your Rights">
              <PolicyItem
                icon="account-check-outline"
                title="Access and Update"
                content="You have the right to access and update the personal information we hold about you. You can do this by contacting us directly."
              />

              <PolicyItem
                icon="delete-outline"
                title="Deletion"
                content="You may request that we delete your personal information from our systems. Please note that we may be required to keep some information for legal or administrative purposes."
              />

              <PolicyItem
                icon="bell-off-outline"
                title="Opt-Out"
                content="You can opt out of receiving promotional communications from us by following the unsubscribe instructions included in each communication."
                isLast
              />
            </ContentSection>

            {/* Children's Privacy */}
            <ContentSection title="Children's Privacy">
              <View className="p-4">
                <Text className="mb-4 text-gray-700 dark:text-gray-300">
                  Our Service is not directed to children under the age of 13. We do not knowingly
                  collect personally identifiable information from children under 13. If you are a
                  parent or guardian and you are aware that your child has provided us with personal
                  information, please contact us so that we can take necessary actions.
                </Text>
              </View>
            </ContentSection>

            {/* Changes to Policy */}
            <ContentSection title="Changes to This Policy">
              <View className="p-4">
                <Text className="mb-4 text-gray-700 dark:text-gray-300">
                  We may update our Privacy Policy from time to time. We will notify you of any
                  changes by posting the new Privacy Policy on this page and updating the{" "}
                  <Text className="text-blue-600 dark:text-blue-400">Last Updated</Text> date at the
                  top of this Privacy Policy. You are advised to review this Privacy Policy
                  periodically for any changes.
                </Text>
              </View>
            </ContentSection>

            {/* Contact Us */}
            <ContentSection title="Contact Us">
              <View className="p-4">
                <Text className="mb-4 text-gray-700 dark:text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at:
                </Text>
                <View className="mb-4 flex-row items-center">
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={isDarkMode ? "#93c5fd" : "#3b82f6"}
                    style={{ marginRight: 8 }}
                  />
                  <Text className="text-blue-600 dark:text-blue-400">bimonlangb@gmail.com</Text>
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

type PolicyItemProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  content: string;
  isLast?: boolean;
};

const PolicyItem = ({ icon, title, content, isLast }: PolicyItemProps) => {
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
