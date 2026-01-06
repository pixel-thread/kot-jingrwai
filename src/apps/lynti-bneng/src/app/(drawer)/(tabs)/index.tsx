import { View } from 'react-native';
import { Text } from '@repo/ui-native';

export default function Home() {
  return (
    <View className="justify-content h-screen flex-1 items-center">
      <Text size="4xl" weight={'bold'}>
        Home
      </Text>
    </View>
  );
}
