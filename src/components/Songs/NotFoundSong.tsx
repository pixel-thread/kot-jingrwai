import { Container } from '../Common/Container';
import { Text } from '../ui/typography';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Button } from '../ui/button';

type NotFoundSongProps = {
  reset: () => void;
};
export const NotFoundSong = ({ reset }: NotFoundSongProps) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();

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
            <MaterialCommunityIcons name="music-off" size={48} color="white" />
          </View>
        </Reanimated.View>

        <Reanimated.View entering={FadeInDown.delay(500).duration(800)}>
          <Text
            size={'3xl'}
            weight={'bold'}
            className="mb-3 text-center text-gray-800 dark:text-white">
            Song Not Found
          </Text>
        </Reanimated.View>

        <Reanimated.View entering={FadeInDown.delay(700).duration(800)}>
          <Text size={'lg'} align={'center'} className="mb-6 text-gray-600 dark:text-gray-300">
            We couldn&apos;t find the song you&apos;re looking for. Try searching again or return to
            the home page.
          </Text>
        </Reanimated.View>

        <Reanimated.View entering={FadeInDown.delay(900).duration(800)}>
          <Button
            title="Clear"
            variant="primary"
            size="lg"
            icon={
              <MaterialCommunityIcons
                name="home"
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

// Styles are now inline with className and style props
