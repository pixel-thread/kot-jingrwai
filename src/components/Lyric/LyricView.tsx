import { View, ScrollView } from 'react-native';
import { cn } from '~/src/libs/cn';
import { SongT } from '~/src/types/song';
import { Text } from '~/src/components/ui/typography';

type LyricViewProps = {
  song: SongT;
};

export const LyricView = ({ song }: LyricViewProps) => {
  const title = song.title;
  const paragraphs = song.paragraphs;
  const sortedParagraphs = [...paragraphs].sort((a, b) => a.order - b.order);

  // Count section numbers (Verse 1, Verse 2, etc
  const sectionCount: Record<string, number> = {};

  return (
    <ScrollView className="flex-1 p-4">
      <View className="mb-6 items-center">
        <Text size={'3xl'} weight={'extrabold'} className="text-center ">
          {title}
        </Text>
        <Text size={'sm'} variant={'muted'} className="text-center ">
          {song.metadata.author ?? song.metadata.composer}
        </Text>
        {song.metadata.syllables && (
          <Text variant={'muted'} weight={'medium'} className="text-center">
            {song.metadata.syllables}
          </Text>
        )}
      </View>

      {/* Lyrics */}
      <View className="space-y-6">
        {sortedParagraphs.map((paragraph) => {
          const type = capitalize(paragraph.type ?? 'Verse');
          sectionCount[type] = (sectionCount[type] || 0) + 1;

          return (
            <View key={paragraph.id} className="space-y-2 px-2">
              {/* Paragraph Label */}
              <Text italic size={'sm'} variant={'muted'} className="text-right">
                {type} {sectionCount[type] > 1 ? sectionCount[type] : ''}
              </Text>

              {/* Paragraph Box */}
              <View className={getParagraphStyle(paragraph.type)}>
                {paragraph.lines.map((line, index) => {
                  const isFirst = index === 0;
                  const isLast = index === paragraph.lines.length - 1;
                  const isChorus = paragraph.type === 'chorus';

                  const textContent = isChorus
                    ? `${isFirst ? '“' : ''}${line}${isLast ? '”' : ''}`
                    : line;

                  return (
                    <Text
                      key={`${paragraph.id}-line-${index}`}
                      size={'lg'}
                      variant={isChorus ? 'muted' : 'default'}
                      className={cn(
                        isChorus
                          ? 'font-medium italic text-blue-800 dark:text-blue-300'
                          : 'text-gray-900 dark:text-gray-100',
                        'leading-relaxed'
                      )}>
                      {textContent || ' '}
                    </Text>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

// Utility to get background style by paragraph type
const getParagraphStyle = (type?: string): string => {
  const baseStyle = 'p-4 rounded-lg';

  switch (type) {
    case 'chorus':
      return `${baseStyle} bg-blue-100 dark:bg-blue-900/30`;
    case 'verse':
      return `${baseStyle} bg-gray-100 dark:bg-gray-800`;
    case 'bridge':
      return `${baseStyle} bg-purple-100 dark:bg-purple-900/30`;
    case 'intro':
      return `${baseStyle} bg-green-100 dark:bg-green-900/30`;
    case 'outro':
      return `${baseStyle} bg-yellow-100 dark:bg-yellow-900/30`;
    default:
      return `${baseStyle} bg-gray-50 dark:bg-neutral-800`;
  }
};

// Capitalizes first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
