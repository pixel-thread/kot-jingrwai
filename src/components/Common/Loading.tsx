import { ActivityIndicator, View } from 'react-native';
export const LoadingScreen = () => {
  return (
    <View className="h-screen flex-1 items-center justify-center bg-gray-200 dark:bg-gray-800">
      <ActivityIndicator size={'large'} />
    </View>
  );
};
