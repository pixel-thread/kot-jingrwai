import { useEffect } from 'react';
import Reanimated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Container } from '@repo/ui-native';
import { Text } from '@repo/ui-native';
import { apostleCreed } from '~/src/libs/apostle-creed';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useTextStore } from '~/src/libs/stores/text';

export const ApostleCreedPage = () => {
  const { size } = useTextStore();

  const indent = (text: string[], spaces = 4) => `${'\u00A0\u00A0'.repeat(spaces)}${text}`;
  const headerOpacity = useSharedValue(0);
  const listOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    listOpacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        className="mb-16">
        <View className="flex-1" collapsable={false}>
          <Reanimated.View
            style={headerAnimatedStyle}
            className="mb-6 w-full items-center justify-center rounded-b-3xl bg-gradient-to-r from-indigo-600 to-purple-600 pb-6 pt-6 shadow-lg">
            <Text size={'3xl'} weight={'extrabold'} className="mb-1 text-center">
              {apostleCreed.title}
            </Text>
          </Reanimated.View>

          <Reanimated.View entering={FadeIn.duration(800)}>
            <View className="mx-4 gap-2">
              {apostleCreed.paragraphs.map((paragraph, index) => (
                <Reanimated.View
                  key={index}
                  entering={FadeIn.duration(800)}
                  className="rounded-2xl p-4 dark:bg-gray-800">
                  <Text
                    size={size}
                    weight={'bold'}
                    align={'justify'}
                    leading={'loose'}
                    tracking={'normal'}
                    className="text-gray-800 dark:text-white">
                    {paragraph.lines.map((line, index) => (
                      <Text
                        key={index}
                        size={size}
                        weight={'bold'}
                        align={'justify'}
                        leading={'loose'}
                        tracking={'normal'}
                        className="text-gray-800 dark:text-white">
                        &nbsp; {line.text}
                      </Text>
                    ))}
                  </Text>
                </Reanimated.View>
              ))}
            </View>
          </Reanimated.View>
        </View>
      </ScrollView>
    </Container>
  );
};
