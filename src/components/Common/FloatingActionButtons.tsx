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
        'absolute bottom-3 left-0 right-0 z-50 flex items-center justify-center',
        !isVisible && 'hidden'
      )}>
      <View className="rounded-lg bg-transparent px-4">
        <FlashList
          data={buttons}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={item.onPress}
              className="mx-2 flex-row items-center justify-center rounded-2xl bg-white px-4 py-3 dark:bg-gray-950">
              {item.icon || <FontAwesome name="plus" size={20} color="#000" />}
            </TouchableOpacity>
          )}
          horizontal
          estimatedItemSize={60}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
