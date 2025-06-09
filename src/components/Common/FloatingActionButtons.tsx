import { View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type ActionButton = {
  onPress: () => void;
  icon?: React.ReactNode;
  label?: string;
};

type Props = {
  buttons: ActionButton[];
};

export const FloatingActionButtons = ({ buttons }: Props) => {
  return (
    <View className="absolute bottom-6 right-6 z-50 gap-y-3">
      {buttons.map((btn, index) => (
        <TouchableOpacity
          key={index}
          onPress={btn.onPress}
          className="flex-row items-center justify-center rounded-full bg-indigo-500/50 px-4 py-3 shadow-lg dark:bg-indigo-500">
          {btn.icon || <FontAwesome name="plus" size={20} color="#000" />}
        </TouchableOpacity>
      ))}
    </View>
  );
};
