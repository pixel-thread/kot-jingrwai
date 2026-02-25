import { Stack } from "expo-router";
import { CustomHeader } from "~/src/components/Common/CustomHeader";

export default function songLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Songs",
        header: ({ options }) => <CustomHeader options={options} back />,
      }}
    />
  );
}
