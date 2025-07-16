import { View, Alert, Linking, TouchableOpacity } from 'react-native';
import { Text } from '~/src/components/ui/typography';

export default function ContactScreen() {
  const email = 'bimonlangb@gmail.com';
  const phone = '+91 883 701 1018';
  const address = 'Mairang Kynshi 793120';
  // const mapUrl = 'https://www.google.com/maps?q=123+Pixel+Street,+Lagos';

  const openEmail = async () => {
    const url = `mailto:${email}`;
    const supported = await Linking.canOpenURL(url);
    supported ? Linking.openURL(url) : Alert.alert('Error', 'Email app is not available.');
  };

  // const callPhone = async () => {
  //   const url = `tel:${phone}`;
  // const supported = await Linking.canOpenURL(url);
  // supported ? Linking.openURL(url) : Alert.alert('Error', 'Phone app is not available.');
  // };

  // const openMap = async () => {
  //   const supported = await Linking.canOpenURL(mapUrl);
  //   supported ? Linking.openURL(mapUrl) : Alert.alert('Error', 'Map service not available.');
  // };

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
        <TouchableOpacity onPress={openEmail}>
          <Text className="text-lg text-blue-600 underline dark:text-blue-400">{email}</Text>
        </TouchableOpacity>
      </View>

      {/* Phone Section */}
      <View className="mb-6">
        <Text className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
          Phone
        </Text>
        <Text className="mb-2 text-base text-gray-700 dark:text-gray-300">
          Call us during office hours.
        </Text>
        <TouchableOpacity>
          <Text className="text-lg text-blue-600 underline dark:text-blue-400">{phone}</Text>
        </TouchableOpacity>
      </View>

      {/* Address Section */}
      <View className="mb-6">
        <Text className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
          Address
        </Text>
        <Text className="mb-2 text-base text-gray-700 dark:text-gray-300">
          Visit our office or find us on the map.
        </Text>
        <TouchableOpacity>
          <Text className="text-lg text-blue-600 underline dark:text-blue-400">{address}</Text>
        </TouchableOpacity>
      </View>

      {/* Office Hours */}
      <View className="mb-6">
        <Text className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
          Office Hours
        </Text>
        <Text className="text-base text-gray-700 dark:text-gray-300">
          Monday – Friday, 9:00 AM – 6:00 PM (Local Time)
        </Text>
      </View>

      {/* Footer */}
      <View className="mt-12">
        <Text className="text-center text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} PixelThread Inc. All rights reserved.
        </Text>
      </View>
    </View>
  );
}
