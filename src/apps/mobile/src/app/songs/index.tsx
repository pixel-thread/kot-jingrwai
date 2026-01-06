import { Stack, useLocalSearchParams } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { ThemeToggle } from '@repo/ui-native';
import { AllSongPage } from '~/src/components/Songs';

type RouteParams = {
  isChorus?: string;
};

export default function Song() {
  const { isChorus } = useLocalSearchParams<RouteParams>();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: isChorus === 'true' ? 'Ki Khorus' : 'Ki Jingrwai',
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<ThemeToggle />} />
          ),
        }}
      />
      <AllSongPage isKhorus={isChorus === 'true' ? true : false} />
    </>
  );
}
