import { normalizeForSearch } from '../utils/normalizeTextForSearch';
import { SongT } from '../types/song';
import { getSongs } from '../services/song/getSongs';
import { useQuery } from '@tanstack/react-query';

type UseFilteredSongsProps = {
  searchQuery?: string;
  isKhorus?: boolean;
};

export const useFilteredSongs = ({
  searchQuery = '',
  isKhorus = false,
}: UseFilteredSongsProps): SongT[] => {
  const querykey = isKhorus ? ['songs', 'khorus', isKhorus] : ['songs'];
  const { data: dataSource } = useQuery({
    queryKey: querykey,
    queryFn: async () => await getSongs({ isChorus: isKhorus }),
    notifyOnChangeProps: ['data'],
  });

  const query = searchQuery.trim();

  // Select the correct data source

  if (!dataSource) {
    return [];
  }

  // If no query, return all songs from the selected source
  if (!query) return dataSource;

  const normalizedQuery = normalizeForSearch(query);

  return dataSource.filter(({ title, metadata, paragraphs }) => {
    const searchFields = [
      title,
      metadata.author,
      metadata.composer,
      metadata.number?.toString(),
      paragraphs[0]?.lines[0].text,
    ].filter(Boolean); // Remove null/undefined values

    return searchFields.some((field) => {
      const normalizedField = normalizeForSearch(field ?? '');
      return normalizedField?.includes(normalizedQuery);
    });
  });
};
