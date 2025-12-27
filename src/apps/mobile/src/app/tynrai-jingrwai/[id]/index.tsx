import { Stack, useLocalSearchParams } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { ThemeToggle } from '~/src/components/Common/theme/ThemeToggle';

import Reanimated, { FadeIn } from 'react-native-reanimated';
import { TynraijingrwaiDetails } from '~/src/components/screen/tynrai-jingrwai/TynraiJingrwaiDetails';
import { tynraiJingrwai } from '@repo/constants';

export default function page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tynrai = tynraiJingrwai.find((val) => val.id === id);
  const title = tynrai?.title || 'Tynrai Jingrwai';
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name={'Tynrai Jingrwai'}
        options={{
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<ThemeToggle />} />
          ),
          title: title,
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <TynraijingrwaiDetails id={id} />
    </Reanimated.View>
  );
}
