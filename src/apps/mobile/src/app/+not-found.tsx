import { Link, Stack } from 'expo-router';
import { Container, Text } from '@repo/ui-native';
import Reanimated, { FadeIn } from 'react-native-reanimated';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Reanimated.View
          entering={FadeIn.duration(500)}
          className="flex-1 items-center justify-center px-4">
          <Text size="3xl" weight="black" align="center" className="mb-6">
            404
          </Text>
          <Text size="2xl" weight="bold" align="center" className="mb-6">
            This screen doesn&apos;t exist.
          </Text>
          <Link href="/" className="mt-4 pt-4">
            <Text size="lg" weight="semibold" className="text-indigo-600 dark:text-indigo-400">
              Go to home screen!
            </Text>
          </Link>
        </Reanimated.View>
      </Container>
    </>
  );
}
