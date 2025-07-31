import { View, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { logger } from '~/src/utils/logger';
import { ContentSection } from '../../Common/ContentSection';
import * as Linking from 'expo-linking';

export default function ContactScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const email = 'bimonlangb@gmail.com';
  const phone = '+91 883 701 1018';
  const address = 'Mairang Kynshi 793120';
  const mapUrl = 'https://www.google.com/maps?q=Mairang+Kynshi+793120';

  // Animation values
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Delay showing content for smooth animation
    const timer = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const openEmail = async () => {
    const url = `mailto:${email}`;
    const supported = true;
    supported ? Linking.openURL(url) : Alert.alert('Error', 'Email app is not available.');
  };

  const openPhone = async (phone: string) => {
    const cleaned = phone.replace(/[^0-9+]/g, ''); // remove spaces, dashes, etc.
    const url = `tel:${cleaned}`;

    try {
      const supported = true;

      if (!supported) {
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert('Error', 'Unable to open the phone dialer.');
    }
  };

  const openMap = async () => {
    const supported = true;
    supported ? Linking.openURL(mapUrl) : Alert.alert('Error', 'Map app is not available.');
  };

  return (
    <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-950">
      <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
        {contentVisible && (
          <>
            {/* Contact Info Section */}
            <ContentSection title="Contact Information">
              <ContactItem
                icon="email-outline"
                title="Email"
                value={email}
                description="Reach us via email for support or inquiries"
                onPress={openEmail}
              />

              <ContactItem
                icon="phone-outline"
                title="Phone"
                value={phone}
                description="Call us during office hours"
                onPress={() => openPhone(phone)}
              />

              <ContactItem
                icon="map-marker-outline"
                title="Address"
                value={address}
                description="Visit our office or find us on the map"
                onPress={openMap}
                isLast
              />
            </ContentSection>

            {/* Hours Section */}
            <ContentSection title="Office Hours">
              <View className="p-4">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={24}
                    color={isDarkMode ? '#93c5fd' : '#3b82f6'}
                  />
                  <View className="ml-3">
                    <Text weight="semibold" className="text-gray-800 dark:text-gray-100">
                      Business Hours
                    </Text>
                    <Text size="sm" className="text-gray-500 dark:text-gray-400">
                      Monday – Friday
                    </Text>
                    <Text size="sm" className="text-gray-500 dark:text-gray-400">
                      9:00 AM – 6:00 PM (Local Time)
                    </Text>
                  </View>
                </View>
              </View>
            </ContentSection>

            {/* Social Media Section */}
            <ContentSection title="Connect With Us">
              <View className="flex-row justify-around p-4">
                <SocialButton icon="facebook" label="Facebook" />
                <SocialButton icon="instagram" label="Instagram" />
                <SocialButton icon="twitter" label="Twitter" />
                <SocialButton icon="youtube" label="YouTube" />
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

type ContactItemProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  value: string;
  description?: string;
  onPress?: () => void;
  isLast?: boolean;
};

const ContactItem = ({ icon, title, value, description, onPress, isLast }: ContactItemProps) => {
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
          <Text className="mt-1 text-blue-600 dark:text-blue-400">{value}</Text>
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

type SocialButtonProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
};

const SocialButton = ({ icon, label }: SocialButtonProps) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <TouchableOpacity className="items-center">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
        <MaterialCommunityIcons name={icon} size={24} color={isDarkMode ? '#93c5fd' : '#3b82f6'} />
      </View>
      <Text size="xs" className="mt-1 text-gray-600 dark:text-gray-400">
        {label}
      </Text>
    </TouchableOpacity>
  );
};
