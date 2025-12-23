import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Reanimated from 'react-native-reanimated';
import { Text } from '~/src/components/ui/typography';
import { useColorScheme } from 'nativewind';
import { gray } from 'tailwindcss/colors';

type SearchBarProps = {
  onSearch: (query: string) => void;
  value: string;
  label?: string;
  placeholder?: string;
};

export const SearchBar = React.memo(
  ({
    onSearch,
    value,
    label = 'Find Your Songs',
    placeholder = 'Search by name...',
  }: SearchBarProps) => {
    const [searchValue, setValue] = useState(value);
    const inputRef = useRef<TextInput>(null);
    const { colorScheme } = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
      <Reanimated.View className="mb-2 rounded-2xl">
        <View className="mb-2 flex-row items-center">
          <MaterialCommunityIcons name="music-note" size={24} color="#6366f1" />
          <Text size={'lg'} weight={'semibold'} className="ml-2 text-gray-800 dark:text-white">
            {label}
          </Text>
        </View>
        <View className="flex-row items-center gap-x-2">
          <View className="w-full flex-1 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
            <View className="flex-row items-center px-3">
              <Ionicons name="search-outline" size={24} color="#6366f1" />
              <TextInput
                ref={inputRef}
                placeholder={placeholder}
                className="h-16 flex-1 items-center p-4 text-start align-middle  dark:text-white"
                placeholderClassName="text-xl"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#9ca3af'}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                defaultValue={value}
                value={searchValue}
                onChangeText={(text) => setValue(text)}
                onSubmitEditing={() => onSearch(searchValue)}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!searchValue}
            className="w-auto items-center justify-center rounded-xl bg-indigo-600 p-4 shadow-sm disabled:opacity-50"
            onPress={() => onSearch(searchValue)}>
            <Ionicons name="search" size={24} color={isDarkMode ? gray[200] : gray[50]} />
          </TouchableOpacity>
        </View>
      </Reanimated.View>
    );
  }
);
