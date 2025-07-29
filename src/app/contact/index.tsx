import { Stack } from 'expo-router';
import { View } from 'react-native';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import ContactScreen from '~/src/components/Contact';

export default function page() {
  return (
    <View className="flex-1">
      <Stack.Screen
        name="Contact"
        options={{
          header: ({ options }) => <CustomHeader options={options} back />,
          title: 'Contact',
          headerShown: true,
        }}
      />
      <ContactScreen />
    </View>
  );
}
