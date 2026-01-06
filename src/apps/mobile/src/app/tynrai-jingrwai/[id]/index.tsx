import { Stack, useLocalSearchParams } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { ThemeToggle } from '@repo/ui-native';

import Reanimated, { FadeIn } from 'react-native-reanimated';
import { TynraijingrwaiDetails } from '~/src/components/screen/tynrai-jingrwai/TynraiJingrwaiDetails';
import { tynraiJingrwai } from '@repo/constants';
import { useThemeStore } from '~/src/libs/stores/theme';

const TynraiJingrwaiPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tynrai = tynraiJingrwai.find((val) => val.id === id);
  const title = tynrai?.title || 'Tynrai Jingrwai';
  const { setTheme, theme } = useThemeStore();
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name={'Tynrai Jingrwai'}
        options={{
          header: ({ options }) => (
            <CustomHeader
              options={options}
              back
              headerRight={<ThemeToggle theme={theme} setTheme={setTheme} />}
            />
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
};

export default TynraiJingrwaiPage;
