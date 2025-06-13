import { View, Alert, Linking, TouchableOpacity } from 'react-native';
import { Text } from '~/src/components/ui/typography';

export default function ContactScreen() {
  const email = 'bimonlangb@gmail.com';

  const handleEmailPress = async () => {
    const url = `mailto:${email}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Email app is not available.');
    }
  };

  return (
    <View className="flex-1 bg-gray-200 px-6 py-10 dark:bg-gray-950">
      <Text className="mb-8 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Contact Us
      </Text>

      {/* Email Section */}
      <View className="mb-6">
        <Text className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
          Email
        </Text>
        <Text className="mb-2 text-base text-gray-700 dark:text-gray-300">
          Reach us via email for support or inquiries.
        </Text>
        <TouchableOpacity onPress={handleEmailPress}>
          <Text className="text-lg text-blue-600 underline dark:text-blue-400">
            pixelthread@gmail.com
          </Text>
        </TouchableOpacity>
      </View>

      {/* Office Hours */}
      <View className="mt-8">
        <Text className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
          Office Hours
        </Text>
        <Text className="text-base text-gray-700 dark:text-gray-300">
          Monday – Friday, 9:00 AM – 6:00 PM (Local Time)
        </Text>
      </View>
    </View>
  );
}
