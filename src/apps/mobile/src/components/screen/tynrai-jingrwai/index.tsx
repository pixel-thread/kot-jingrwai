import { View, ScrollView } from 'react-native';
import { Text } from '@repo/ui-native';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { tynraiJingrwai } from '@repo/constants';
import { TynraiJingrwaiT } from '@repo/types';
import { CategoryItem } from './CategoryItems';
import { ContentSection } from '../../Common/ContentSection';
import { useRouter } from 'expo-router';
import { Container } from '../../Common/Container';

export default function TynraiJingrwaiScreen() {
  const router = useRouter();

  const handleCategoryPress = (category: TynraiJingrwaiT) => {
    router.push(`/tynrai-jingrwai/${category?.id || '1'}`);
  };

  return (
    <Container>
      <ScrollView className="h-auto flex-1">
        <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
          <ContentSection title="Tynrai Jingrwai">
            <View className="p-4">
              <Text className="mb-4 text-gray-700 dark:text-gray-300">
                Explore the Kot Jingrwai content organized by categories. Select a category to view
                songs within that range.
              </Text>
            </View>
          </ContentSection>

          {tynraiJingrwai.map((category, index) => (
            <ContentSection key={index} title={category.title}>
              <CategoryItem
                title={category.title}
                range={`${category.from} - ${category.to}`}
                onPress={() => handleCategoryPress(category)}
              />
            </ContentSection>
          ))}

          {/* Footer */}
          <Reanimated.View entering={FadeInDown.delay(500).duration(500)} className="mb-4 mt-8">
            <Text className="text-center text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} Kot Jingrwai. All rights reserved.
            </Text>
          </Reanimated.View>
        </Reanimated.View>
      </ScrollView>
    </Container>
  );
}
