import { View } from "react-native";
import { Text } from "../typography";
import Reanimated, { FadeInUp, useSharedValue, withSpring } from "react-native-reanimated";
import { Button } from "../button";

type Props = {
  setHasCompletedOnboarding: (hasCompletedOnboarding: boolean) => void;
  onContinueAsGuest: () => void;
  onContinueWithGoogle: () => void;
};

export function SinglePageOnboarding({
  setHasCompletedOnboarding,
  onContinueAsGuest,
  onContinueWithGoogle,
}: Props) {
  // Animation value for buttons
  const scaleLogin = useSharedValue(1);
  const scaleGuest = useSharedValue(1);

  const handleLogin = () => {
    console.log("Login with Google");
    scaleLogin.value = withSpring(0.95, { duration: 100 });
    setTimeout(() => (scaleLogin.value = withSpring(1)), 200);
    onContinueWithGoogle();
  };

  const handleGuest = () => {
    setHasCompletedOnboarding(true);
    scaleGuest.value = withSpring(0.95, { duration: 100 });
    setTimeout(() => (scaleGuest.value = withSpring(1)), 200);
    onContinueAsGuest();
  };

  return (
    <>
      <View className="flex-1 items-center justify-center bg-gray-200 p-8 dark:bg-gray-950">
        <Reanimated.View entering={FadeInUp.duration(600)} className="w-full max-w-md items-center">
          {/* Logo */}
          <Text
            size="4xl"
            weight="bold"
            tracking={"widest"}
            className="mb-4 text-center text-gray-800 dark:text-gray-100">
            Ka Kot Jingrwai
          </Text>
          <Text
            size="lg"
            weight="medium"
            tracking={"wider"}
            className="mb-8 text-center text-gray-600 dark:text-gray-300">
            Your complete collection of Khasi hymns and songs at your fingertips.
          </Text>
        </Reanimated.View>
      </View>

      <View className="absolute bottom-0 left-0 right-0 z-10 flex flex-col gap-y-2 px-2">
        {/* Animated Login Button */}
        <Reanimated.View style={{ transform: [{ scale: scaleLogin }] }}>
          <Button disabled onPress={handleLogin} title="Login with Google" className="py-5" />
        </Reanimated.View>
        <Text className="dark:text-muted-foreground text-center text-gray-500" size={"md"}>
          or
        </Text>
        {/* Animated Guest Button */}
        <Reanimated.View className="mt-2" style={{ transform: [{ scale: scaleGuest }] }}>
          <Button
            onPress={handleGuest}
            title="Continue as Guest"
            variant="outline"
            className="py-5"
          />
        </Reanimated.View>
      </View>
    </>
  );
}
