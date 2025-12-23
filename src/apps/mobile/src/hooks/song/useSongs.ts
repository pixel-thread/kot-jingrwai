import { useQuery } from '@tanstack/react-query';
import { getSongs } from '~/src/services/songs/getSongs';
type Props = {
  isChorus?: boolean;
};
export function useSongs({ isChorus = false }: Props) {
  console.log('useSongs', isChorus);
  return useQuery({
    queryKey: ['songs', isChorus],
    queryFn: async () => await getSongs({ isAll: true }),
  });
}
