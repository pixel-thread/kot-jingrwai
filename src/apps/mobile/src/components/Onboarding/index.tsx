import { useOnboardingStore } from '~/src/libs/stores/onboarding';
import { SinglePageOnboarding } from '@repo/ui-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function Onboarding() {
  const { setHasCompletedOnboarding } = useOnboardingStore();
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <SinglePageOnboarding
        setHasCompletedOnboarding={setHasCompletedOnboarding}
        onContinueAsGuest={() => router.replace('/')}
        onContinueAsGoogle={() => router.replace('/')}
      />
    </SafeAreaView>
  );
}
