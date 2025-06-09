import { View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cn } from '~/src/libs/cn';

type ActionButton = {
  onPress: () => void;
  icon?: React.ReactNode;
  label?: string;
};

type Props = {
  buttons: ActionButton[];
  isVisible: boolean;
};

export const FloatingActionButtons = ({ buttons, isVisible }: Props) => {
  return (
    <View className={cn('absolute bottom-6 right-6 z-50 gap-y-3', !isVisible && 'hidden')}>
      {buttons.map((btn, index) => (
        <TouchableOpacity
          key={index}
          onPress={btn.onPress}
          className="flex-row items-center justify-center rounded-2xl bg-white px-4 py-3 shadow-lg dark:bg-gray-950">
          {btn.icon || <FontAwesome name="plus" size={20} color="#000" />}
        </TouchableOpacity>
      ))}
    </View>
  );
};
