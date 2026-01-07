import { Stack } from "expo-router";
import { CustomHeader } from "~/src/components/Common/CustomHeader";
import { ThemeToggle } from "@repo/ui-native";
import { AboutScreen } from "~/src/components/screen/about";
import Reanimated, { FadeIn } from "react-native-reanimated";
import { useThemeStore } from "@repo/libs";

const AboutPage = () => {
  const { setTheme, theme } = useThemeStore();
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Shaphang Jongngi"
        options={{
          header: ({ options }) => (
            <CustomHeader
              back
              options={options}
              headerRight={<ThemeToggle theme={theme} setTheme={setTheme} />}
            />
          ),
          title: "Shaphang Jongngi",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Back",
        }}
      />
      <AboutScreen />
    </Reanimated.View>
  );
};

export default AboutPage;
