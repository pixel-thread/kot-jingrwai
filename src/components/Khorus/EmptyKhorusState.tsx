import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { Container } from '~/src/components/Common/Container';
import { Text } from '~/src/components/ui/typography';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import { Button } from '../ui/button';

type EmptyKhorusStateProps = {
  reset: () => void;
};
export const EmptyKhorusState = ({ reset }: EmptyKhorusStateProps) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <Container className="h-full">
      <Reanimated.View
        entering={FadeIn.duration(800)}
        className="mx-4 items-center justify-center rounded-2xl bg-white p-8 dark:bg-gray-800"
        style={[
          {
            shadowColor: isDarkMode ? colors.gray[700] : colors.gray[300],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
          },
        ]}>
        <Reanimated.View entering={FadeInDown.delay(300).duration(800)}>
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
            <MaterialCommunityIcons
              name="music-note-off"
              size={48}
              color={isDarkMode ? colors.gray[200] : colors.gray[950]}
            />
          </View>
        </Reanimated.View>

        <Reanimated.View entering={FadeInDown.delay(500).duration(800)}>
          <Text
            size={'3xl'}
            weight={'bold'}
            className="mb-3 text-center text-gray-800 dark:text-white">
            No Chorus Found
          </Text>
        </Reanimated.View>

        <Reanimated.View entering={FadeInDown.delay(700).duration(800)}>
          <Text size={'lg'} align={'center'} className="mb-6 text-gray-600 dark:text-gray-300">
            We couldn&apos;t find any chorus songs matching your search. Try searching with
            different keywords.
          </Text>
        </Reanimated.View>

        <Reanimated.View entering={FadeInDown.delay(900).duration(800)}>
          <Button
            title="Clear"
            variant="primary"
            size="lg"
            icon={
              <MaterialCommunityIcons
                name="select-remove"
                size={20}
                color={isDarkMode ? colors.indigo[400] : colors.white}
              />
            }
            iconPosition="left"
            onPress={reset}
            className="w-full"
          />
        </Reanimated.View>
      </Reanimated.View>
    </Container>
  );
};
