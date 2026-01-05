import { useOnboardingStore } from '~/src/libs/stores/onboarding';
import { SinglePageOnboarding } from '@repo/ui-native';
import { useRouter } from 'expo-router';

export default function Onboarding() {
  const { setHasCompletedOnboarding } = useOnboardingStore();
  const router = useRouter();
  return (
    <SinglePageOnboarding
      setHasCompletedOnboarding={setHasCompletedOnboarding}
      onContinueAsGuest={() => router.replace('/')}
    />
  );
}
