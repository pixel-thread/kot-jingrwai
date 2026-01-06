import { Text } from '@repo/ui-native';
import { View } from 'react-native';

export default function page() {
  return (
    <View className={'justify-content: flex-1 items-center'}>
      <Text size="4xl" weight={'bold'}>
        Bible
      </Text>
    </View>
  );
}
