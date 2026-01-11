import { CustomHeader } from "@/src/components/Common/CustomHeader";
import { UnderDevelopment } from "@repo/ui-native";
import { Stack } from "expo-router";

export default function page() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Ka Lynti Diengphna",
          header: ({ options }) => <CustomHeader back options={options} />,
          headerShown: true,
        }}
      />
      <UnderDevelopment />
    </>
  );
}
