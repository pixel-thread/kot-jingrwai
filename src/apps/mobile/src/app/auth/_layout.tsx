import { Stack } from "expo-router";
import { CustomHeader } from "~/src/components/Common/CustomHeader";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          header: ({ options }) => <CustomHeader back options={options} />,
          title: "Authentication",
          headerShown: true,
        }}
      />
    </>
  );
}
