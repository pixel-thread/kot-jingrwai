import { useMemo } from 'react';
import { songs } from '../libs/songs';
import { normalizeForSearch } from '../utils/normalizeTextForSearch';
import { khoros } from '../libs/khoros';

export const useFilteredSongs = ({
  searchQuery,
  isKhorus = false,
}: {
  searchQuery: string;
  isKhorus?: boolean;
}) => {
  return useMemo(() => {
    const query = searchQuery.trim();

    // Select the correct data source
    const dataSource = isKhorus ? khoros : songs;

    // If no query, return all songs from the selected source
    if (!query || query === '') return dataSource;

    const normalizedQuery = normalizeForSearch(query);

    return dataSource.filter(({ title, metadata, paragraphs }) => {
      const searchFields = [
        title,
        metadata.author,
        metadata.composer,
        metadata.number?.toString(),
        paragraphs[0]?.lines[0],
      ].filter(Boolean); // Remove null/undefined values

      return searchFields.some((field) => {
        const normalizedField = normalizeForSearch(field ?? '');
        return normalizedField?.includes(normalizedQuery);
      });
    });
  }, [searchQuery, isKhorus]); // Include both dependencies
};
