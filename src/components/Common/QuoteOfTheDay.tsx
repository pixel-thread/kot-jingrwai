import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import { logger } from '~/src/utils/logger';
import * as Clipboard from 'expo-clipboard';
import { Skeleton } from '../ui/skeleton';

// Fetch random verse from API
const randomVerse = async (): Promise<{ verse: string; error?: any }> => {
  try {
    const response = await axios.get('https://beta.ourmanna.com/api/v1/get');
    return { verse: response.data };
  } catch (error) {
    logger.error(error);
    return { verse: '', error };
  }
};

export const QuoteOfTheDay = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['random', 'verse'],
    queryFn: randomVerse,
  });
  logger.log({
    error: data,
  });
  // Split the verse into quote and author by dash
  const [quoteText, author] = data?.verse ? data.verse.split(/-\s*/) : ['', ''];

  const copyToClipboard = async () => {
    if (quoteText && data?.verse) {
      await Clipboard.setStringAsync(data?.verse || '');
      ToastAndroid.show('Quote copied to clipboard!', ToastAndroid.SHORT);
    }
  };

  if (isLoading) {
    return (
      <View className="gap-2 rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-900">
        <Skeleton className="mb-1 h-5 w-1/2 self-center" />
        <Skeleton className="mb-2 h-6 w-4/5 self-center" />
        <Skeleton className="h-4 w-1/3 self-end" />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={copyToClipboard}>
      <View className="gap-2 rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-900">
        <Text size="md" weight="medium" align="center" className="mb-1">
          Quote of the Day
        </Text>
        <Text
          size="lg"
          align="center"
          weight={'bold'}
          leading={'loose'}
          italic
          variant="secondary"
          className="mb-2">
          &quot;{quoteText?.trim()}&quot;
        </Text>
        <Text size="sm" variant="secondary" className="text-right">
          - {author?.trim() || 'Unknown'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
