import { useQuery } from '@tanstack/react-query';
import { getSongs } from '~/src/services/songs/getSongs';
type Props = {
  isChorus?: boolean;
};
export function useSongs({ isChorus = false }: Props) {
  return useQuery({
    queryKey: ['songs', isChorus],
    queryFn: () => getSongs({ isAll: true }),
  });
}
