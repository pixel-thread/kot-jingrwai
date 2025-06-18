import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { View, Modal, TouchableOpacity, Pressable, FlatList, Platform } from 'react-native';
import colors from 'tailwindcss/colors';
import { cn } from '~/src/libs/cn';
import { Text } from '../ui/typography';
import AntDesign from '@expo/vector-icons/AntDesign';

type ActionButton = {
  onPress: () => void;
  label?: string;
  icon?: (typeof AntDesign)['name'];
};

type Props = {
  buttons: ActionButton[];
  className?: string;
};

export const Dropdown = ({ buttons, className = '' }: Props) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => setVisible((prev) => !prev);

  const handleAction = (action: () => void) => {
    action();
    setVisible(false);
  };

  return (
    <View className={cn(className)}>
      <TouchableOpacity className="px-2" onPress={toggleDropdown}>
        <FontAwesome
          name="ellipsis-v"
          size={24}
          color={isDarkMode ? colors.gray[200] : colors.gray[950]}
        />
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <Pressable className="flex-1" onPress={() => setVisible(false)} />

        <View
          className={cn(
            'absolute  z-10 min-w-[100px] rounded-lg bg-white py-1 shadow-lg dark:bg-gray-800',
            Platform.OS === 'ios' ? 'right-5 top-32' : 'right-2 top-16'
          )}>
          <FlatList
            data={buttons}
            keyExtractor={(_, index) => `dropdown-item-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row items-center px-4 py-2"
                onPress={() => handleAction(item.onPress)}>
                {item.icon && (
                  <View className="mr-2">
                    <AntDesign
                      name={item.icon}
                      size={18}
                      color={isDarkMode ? colors.gray[200] : colors.gray[950]}
                    />
                  </View>
                )}
                {item.label && <Text>{item.label}</Text>}
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};
