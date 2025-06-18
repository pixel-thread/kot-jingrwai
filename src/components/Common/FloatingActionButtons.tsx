import { View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cn } from '~/src/libs/cn';
import { FlashList } from '@shopify/flash-list';

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
    <View
      className={cn(
        'absolute bottom-1 left-0 right-0 z-50 flex flex-row items-center justify-center gap-x-3',
        !isVisible && 'hidden'
      )}>
      <View className="flex flex-row gap-x-4 rounded-lg bg-transparent">
        <FlashList
          data={buttons}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              className="flex-row items-center justify-center rounded-2xl bg-white px-4 py-3 dark:bg-gray-950">
              {item.icon || <FontAwesome name="plus" size={20} color="#000" />}
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
