import { Modal, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { indigo } from "tailwindcss/colors";
import { Button } from "../ui/button";
import { Container } from "./Container";
import { Text } from "../ui/typography";

type Props = {
  isModal?: boolean;
  title?: string;
  description?: string;
};

export function UnderDevelopment({
  isModal,
  title = "Page Under Development",
  description = "Crafting something extraordinary for your spiritual journey. Stay tuned!",
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const onToggleModal = () => setIsOpen(!isOpen);
  const iconColor = indigo["500"];

  if (isModal) {
    return (
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={onToggleModal}
        statusBarTranslucent={true}>
        <Container className="flex-1 items-center justify-center bg-black/50 p-4">
          <View className="w-full max-w-md items-center space-y-6 rounded-3xl border border-slate-700/50 bg-gradient-to-b from-slate-900/95 to-slate-900/90 p-8 shadow-2xl backdrop-blur-md">
            <MaterialIcons name="code-off" size={80} color={iconColor} />

            <View className="items-center space-y-3">
              <Text weight={"black"} size="3xl" className="tracking-tight">
                {title}
              </Text>
              <Text size={"lg"} className="max-w-sm px-4 text-center leading-relaxed">
                {description}
              </Text>
            </View>

            <View className="mt-3">
              <Button variant="outline" title="Go Back" onPress={onToggleModal} />
            </View>
          </View>
        </Container>
      </Modal>
    );
  }

  return (
    <Container className="flex-1 items-center justify-center space-y-8 bg-gradient-to-b from-slate-900 via-indigo-900/50 to-slate-900/90 p-8">
      <View className="items-center space-y-3">
        <MaterialIcons name="code-off" size={80} color={iconColor} />
        <Text weight={"black"} size="3xl" className="tracking-tight">
          Under Development
        </Text>
        <Text size={"lg"} className="max-w-sm px-4 text-center  leading-relaxed drop-shadow-md">
          Crafting something extraordinary for your spiritual journey. Stay tuned!
        </Text>
      </View>
    </Container>
  );
}
