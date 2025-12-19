import { useLocalSearchParams } from 'expo-router';
import TynraiJingrwaiDetail from '~/src/components/screen/tynrai-jingrwai/TynraiJingrwaiDetails';

const TynraiDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TynraiJingrwaiDetail id={id} />;
};

export default TynraiDetailsScreen;
