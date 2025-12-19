import { View, ScrollView } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { TynraiJingrwaiT } from '~/src/types/tynrai-jingrwai';
import { CategoryItem } from './CategoryItems';
import { ContentSection } from '../../Common/ContentSection';
import * as Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getTynraiJingrwai } from '~/src/services/tynrai-jingrwai/getTynraiJingrwai';

export default function TynraiJingrwaiScreen() {
  const router = useRouter();

  const { data: tynraiJingrwai = [] } = useQuery({
    queryKey: ['tynrai jingrwai'],
    queryFn: async () => await getTynraiJingrwai(),
  });

  const handleCategoryPress = (category: TynraiJingrwaiT) => {
    router.push(`/tynrai-jingrwai/${category.id}`);
  };

  return (
    <ScrollView className="h-auto flex-1 bg-gray-200 dark:bg-gray-950">
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

        <Reanimated.View entering={FadeInDown.delay(500).duration(500)} className="mb-4 mt-8">
          <Text className="text-center text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} {Constants.default.expoConfig?.name || 'Kot Ong'}. All
            rights reserved.
          </Text>
        </Reanimated.View>
      </Reanimated.View>
    </ScrollView>
  );
}
