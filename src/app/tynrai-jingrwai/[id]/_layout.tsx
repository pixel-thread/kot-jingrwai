import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { ThemeToggle } from '~/src/components/Common/theme/ThemeToggle';
import { getTynraiJingrwaiById } from '~/src/services/tynrai-jingrwai/getTynraiJingrwaiById';

const TunraiDeailLayout = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['tynrai jingrwai', id],
    queryFn: async () => await getTynraiJingrwaiById({ id }),
  });
  return (
    <>
      <Stack
        screenOptions={{
          header: ({ options }) => (
            <CustomHeader options={options} back headerRight={<ThemeToggle />} />
          ),
          title: `${data?.from}-${data?.to}`,
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
    </>
  );
};

export default TunraiDeailLayout;
