import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Container } from '~/src/components/Common/Container';
import { LyricView } from '~/src/components/Lyric/LyricView';
import { khoros } from '~/src/libs/khoros';

export default function Khorus() {
  const { khorusNo } = useLocalSearchParams();
  const chorusNumber = Number(khorusNo);
  const khorus = khoros.find((khorus) => khorus.metadata.number === chorusNumber);
  if (!khorus) {
    return <View>Khorus not found</View>;
  }
  return (
    <Container>
      <LyricView song={khorus} />
    </Container>
  );
}
