import { PrivacyPolicyScreen, ThemeToggle } from "@repo/ui-native";
import Reanimated, { FadeIn } from "react-native-reanimated";
import { Stack } from "expo-router";
import { CustomHeader } from "@components/Common/CustomHeader";
import { useThemeStore } from "@repo/libs";

const PrivacyPolicy = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Privacy Policy"
        options={{
          header: ({ options }) => (
            <CustomHeader
              options={options}
              back
              headerRight={<ThemeToggle setTheme={setTheme} theme={theme} />}
            />
          ),
          title: "Privacy Policy",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Back",
        }}
      />
      <PrivacyPolicyScreen />
    </Reanimated.View>
  );
};

export default PrivacyPolicy;
