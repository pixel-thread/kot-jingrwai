import { Stack } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import ContactScreen from '~/src/components/screen/Contact';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { ThemeToggle } from '@repo/ui-native';
import { useThemeStore } from '~/src/libs/stores/theme';

export default function ContactPage() {
  const { theme, setTheme } = useThemeStore();
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Contact"
        options={{
          header: ({ options }) => (
            <CustomHeader
              options={options}
              back
              headerRight={<ThemeToggle setTheme={setTheme} theme={theme} />}
            />
          ),
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
