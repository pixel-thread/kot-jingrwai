import PrivacyPolicyScreen from '~/src/components/screen/privacy-policy';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { Stack } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { ThemeToggle } from '~/src/components/Common/theme/ThemeToggle';

export default function PrivacyPolicy() {
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Privacy Policy"
        options={{
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<ThemeToggle />} />
          ),
          title: 'Privacy Policy',
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <PrivacyPolicyScreen />
    </Reanimated.View>
  );
}
