import { useQuery } from '@tanstack/react-query';
import { getUniqueSongs } from '~/src/services/songs/getUniqueSong';

type Props = {
  id: string;
};

export function useSong({ id }: Props) {
  return useQuery({
    queryKey: ['song', id],
    queryFn: () => getUniqueSongs({ id }),
    enabled: !!id,
  });
}
