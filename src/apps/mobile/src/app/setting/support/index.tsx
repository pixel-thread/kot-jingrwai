import { Stack } from "expo-router";
import { CustomHeader } from "~/src/components/Common/CustomHeader";
import { ThemeToggle, HelpSupportScreen } from "@repo/ui-native";
import Reanimated, { FadeIn } from "react-native-reanimated";
import { useThemeStore } from "@repo/libs";

const SupportPage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Help & Support"
        options={{
          header: ({ options }) => (
            <CustomHeader
              options={options}
              back
              headerRight={<ThemeToggle theme={theme} setTheme={setTheme} />}
            />
          ),
          title: "Help & Support",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Back",
        }}
      />
      <HelpSupportScreen />
    </Reanimated.View>
  );
};

export default SupportPage;
