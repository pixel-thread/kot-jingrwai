import { View, ScrollView } from 'react-native';
import { Text } from '~/src/components/ui/typography';
import Reanimated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { tynraiJingrwai } from '~/src/libs/tynrai-jingrwai';
import { TynraiJingrwaiT } from '~/src/types/tynrai-jingrwai';
import { CategoryItem } from './CategoryItems';
import { SubCategoryItem } from './SubCategoryItems';
import { ContentSection } from '../../Common/ContentSection';

export default function TynraiJingrwaiScreen() {
  // Animation values
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Delay showing content for smooth animation
    const timer = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryPress = (category: TynraiJingrwaiT) => {
    // Navigate to song list filtered by range
    // This would need to be implemented based on your app's navigation structure
  };

  return (
    <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-950">
      <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
        {contentVisible && (
          <>
            {/* Introduction Section */}
            <ContentSection title="Tynrai Jingrwai">
              <View className="p-4">
                <Text className="mb-4 text-gray-700 dark:text-gray-300">
                  Explore the Kot Jingrwai content organized by categories. Select a category to
                  view songs within that range.
                </Text>
              </View>
            </ContentSection>

            {/* Main Categories */}
            {tynraiJingrwai.map((category, index) => (
              <ContentSection key={index} title={category.title}>
                <CategoryItem
                  title={category.title}
                  range={`${category.from} - ${category.to}`}
                  onPress={() => handleCategoryPress(category)}
                />

                {/* Sub-categories if they exist */}
                {category.sub &&
                  category.sub.map((subCategory, subIndex) => (
                    <SubCategoryItem
                      key={subIndex}
                      title={subCategory.title}
                      range={`${subCategory.from} - ${subCategory.to}`}
                      onPress={() => handleCategoryPress(subCategory)}
                      isLast={subIndex === (category.sub?.length || 0) - 1}
                    />
                  ))}
              </ContentSection>
            ))}

            {/* Footer */}
            <Reanimated.View entering={FadeInDown.delay(500).duration(500)} className="mb-4 mt-8">
              <Text className="text-center text-xs text-gray-500 dark:text-gray-500">
                © {new Date().getFullYear()} Kot Jingrwai. All rights reserved.
              </Text>
            </Reanimated.View>
          </>
        )}
      </Reanimated.View>
    </ScrollView>
  );
}
