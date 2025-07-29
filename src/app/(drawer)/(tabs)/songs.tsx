import { Stack } from 'expo-router';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { AllSongPage } from '~/src/components/Songs';

export default function Home() {
  return (
    <>
      <AllSongPage />
    </>
  );
}
