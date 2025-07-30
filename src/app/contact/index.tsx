import { Stack } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import ContactScreen from '~/src/components/Contact';
import Reanimated, { FadeIn } from 'react-native-reanimated';

export default function page() {
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Contact"
        options={{
          header: ({ options }) => <CustomHeader options={options} back />,
          title: 'Contact',
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <ContactScreen />
    </Reanimated.View>
  );
}
