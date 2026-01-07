import { Stack } from "expo-router";
import { CustomHeader } from "~/src/components/Common/CustomHeader";
import { ReportScreen } from "@repo/ui-native";
import Reanimated, { FadeIn } from "react-native-reanimated";
import { ThemeToggle } from "@repo/ui-native";
import { useThemeStore } from "@repo/libs";

const ReportPage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Report"
        options={{
          header: ({ options }) => (
            <CustomHeader
              options={options}
              back
              headerRight={<ThemeToggle theme={theme} setTheme={setTheme} />}
            />
          ),
          title: "Report",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Back",
        }}
      />
      <ReportScreen />
    </Reanimated.View>
  );
};

export default ReportPage;
