import { useOnboardingStore } from "@repo/libs";
import { SinglePageOnboarding } from "@repo/ui-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";

export default function Onboarding() {
  const { setHasCompletedOnboarding } = useOnboardingStore();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <SinglePageOnboarding
        setHasCompletedOnboarding={setHasCompletedOnboarding}
        onContinueAsGuest={() => router.replace("/")}
        onContinueWithGoogle={() => router.replace("/")}
      />
    </SafeAreaView>
  );
}
