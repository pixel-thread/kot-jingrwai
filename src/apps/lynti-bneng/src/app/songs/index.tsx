import { Stack, useLocalSearchParams } from "expo-router";
import { CustomHeader } from "@components/Common/CustomHeader";
import { ThemeToggle } from "@repo/ui-native";
import { AllSongPage } from "@components/Songs";
import { useThemeStore } from "@repo/libs";

type RouteParams = {
  isChorus?: string;
};

const SongsPage = () => {
  const { isChorus } = useLocalSearchParams<RouteParams>();
  const { theme, setTheme } = useThemeStore();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: isChorus === "true" ? "Ki Khorus" : "Ki Jingrwai",
          header: ({ options }) => (
            <CustomHeader
              options={options}
              back
              headerRight={<ThemeToggle theme={theme} setTheme={setTheme} />}
            />
          ),
        }}
      />
      <AllSongPage isKhorus={isChorus === "true" ? true : false} />
    </>
  );
};

export default SongsPage;
