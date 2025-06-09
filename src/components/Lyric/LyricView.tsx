import { View } from 'react-native';
import { cn } from '~/src/libs/cn';
import { SongT } from '~/src/types/song';
import { Text } from '~/src/components/ui/typography';
import { useSongStore } from '~/src/libs/stores/songs';
import { useEffect } from 'react';
import { useTextStore } from '~/src/libs/stores/text';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import { useAnimatedRef } from 'react-native-reanimated';
import { useTapGesture } from '~/src/hooks/useTapGesture';
import { useSwipeGesture } from '~/src/hooks/useSwipeGesture';
import { useSongs } from '~/src/hooks/song/useSongs';

type LyricViewProps = {
  song: SongT;
};

export const LyricView = ({ song }: LyricViewProps) => {
  const scrollRef = useAnimatedRef<ScrollView>();
  const { size } = useTextStore();
  const { addRecentlyPlayedSong } = useSongStore();
  const title = song.title;
  const paragraphs = song.paragraphs;
  const sortedParagraphs = [...paragraphs].sort((a, b) => a.order - b.order);

  const { onNextSong, onPreviousSong } = useSongs();
  const { addFavoriteSong, favoriteSongs, removeFavoriteSong } = useSongStore();
  const isFavorite = favoriteSongs.includes(song.metadata.number);
  const sectionCount: Record<string, number> = {};

  useEffect(() => {
    addRecentlyPlayedSong(song);
  }, [addRecentlyPlayedSong, song]);

  const doubleTap = () => {
    if (isFavorite) {
      removeFavoriteSong(song.metadata.number);
    } else {
      addFavoriteSong(song.metadata.number);
    }
  };

  const doubleTapGesture = useTapGesture({
    onTap: doubleTap,
    numberOfTaps: 2,
    simultaneousRef: scrollRef,
  });

  const leftRightGesture = useSwipeGesture({
    onSwipeLeft: onNextSong,
    onSwipeRight: onPreviousSong,
    simultaneousRef: scrollRef,
    threshold: 100,
  });

  const combinedGesture = Gesture.Simultaneous(doubleTapGesture, leftRightGesture);

  return (
    <GestureDetector gesture={combinedGesture}>
      <ScrollView
        ref={scrollRef}
        simultaneousHandlers={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>
        <View className="flex-1" collapsable={false}>
          <View className="items-center px-4 py-2">
            <Text
              size={'3xl'}
              weight={'extrabold'}
              className="text-center leading-10 tracking-widest">
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
          <View className="px-4">
            {sortedParagraphs.map((paragraph) => {
              const type = capitalize(paragraph.type ?? 'Verse');
              sectionCount[type] = (sectionCount[type] || 0) + 1;

              return (
                <View key={paragraph.id} className="flex-1 flex-col space-y-5 px-2">
                  {/* Paragraph Label */}
                  <View className="mt-4">
                    <Text italic size={'sm'} variant={'muted'} className="text-right">
                      {type} {sectionCount[type] > 1 ? sectionCount[type] : ''}
                    </Text>
                  </View>

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
                          size={size}
                          variant={isChorus ? 'muted' : 'default'}
                          className={cn(
                            isChorus
                              ? 'font-medium italic text-blue-800 dark:text-blue-300'
                              : 'text-gray-950 dark:text-gray-200',
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
        </View>
      </ScrollView>
    </GestureDetector>
  );
};

// Utility to get background style by paragraph type
const getParagraphStyle = (type?: string): string => {
  const baseStyle = 'p-4 rounded-lg border border-gray-200 dark:border-gray-950';

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
