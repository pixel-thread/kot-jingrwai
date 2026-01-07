import { Stack } from "expo-router";
import { CustomHeader } from "~/src/components/Common/CustomHeader";
import { ContactScreen } from "@repo/ui-native";
import Reanimated, { FadeIn } from "react-native-reanimated";
import { ThemeToggle } from "@repo/ui-native";
import { useThemeStore } from "@repo/libs";

const ContactPage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <Reanimated.View entering={FadeIn.duration(300)} className="flex-1">
      <Stack.Screen
        name="Contact"
        options={{
          header: ({ options }) => (
            <CustomHeader
              options={options}
              back
              headerRight={<ThemeToggle setTheme={setTheme} theme={theme} />}
            />
          ),
          title: "Contact",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Back",
        }}
      />
      <ContactScreen />
    </Reanimated.View>
  );
};

export default ContactPage;
