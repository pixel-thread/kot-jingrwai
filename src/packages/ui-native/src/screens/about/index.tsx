import { View, ScrollView } from "react-native";
import Reanimated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useState, useEffect } from "react";
import { Container, ContentSection } from "../../common";
import { Text } from "../../typography";

export const AboutScreen = () => {
  // Animation values
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Delay showing content for smooth animation
    const timer = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <ScrollView className="flex-1">
        <Reanimated.View entering={FadeIn.duration(500)} className="p-4">
          {contentVisible && (
            <>
              {/* Welcome Section */}
              <ContentSection title="Shaphang Jongngi">
                <View className="p-4">
                  <Text className="mb-4 text-gray-700 dark:text-gray-300">
                    Ngi sngewbha ban wallam sha phi ia Ka kot jingrwai, ka digital kot jingrwai ha
                    ki por ba phi mane lane long jingiaseng.
                  </Text>
                </View>
              </ContentSection>

              {/* Why We Created This App */}
              <ContentSection title="Balei Ngi Shna Ia Kane Ka App">
                <View className="p-4">
                  <Text className="mb-4 text-gray-700 dark:text-gray-300">
                    Ngi thaw ia Ka kot jingrwai ban iarap ia kito kiba klet lane kim lah ban rah ia
                    ka kot jingrwai ha por mane lane jingiaseng. Ka app jongngi ka ai ka lad ban ioh
                    jingrwai lyngba ki lyrics, ba phi lah ban pyndonkam ha kano kano ka por, ha kano
                    kano ka jaka. Ka thong jongngi ka long ban pynsuk ia ka jingïaid lynti ha ka
                    jingsngewthuh Blei da kaba nang pynneh pynsah ia ka riti ka dustur jong ki
                    jingrwai mane ha ka rukom kaba janai bad kaba suk ban pyndonkam.
                  </Text>
                </View>
              </ContentSection>

              {/* Our Vision */}
              <ContentSection title="Ka Vision jong ngi">
                <View className="p-4">
                  <Text className="mb-4 text-gray-700 dark:text-gray-300">
                    Ka jingsngewthuh jongngi ka long ba ka technology ka lah ban kyntiew ia ka
                    jingïatylli ha ki balang.
                  </Text>
                </View>
              </ContentSection>

              {/* Our Mission */}
              <ContentSection title="Ka Jingthmu jong ngi">
                <View className="p-4">
                  <Text className="mb-4 text-gray-700 dark:text-gray-300">
                    Ngin ialeh ban nang pynbha shuh shuh ia kane ka app halor ka jingai jingmut
                    jongphi, bad ban pynsuk ia ki nongpyndonkam.
                  </Text>
                </View>
              </ContentSection>

              {/* Thank You */}
              <ContentSection title="Khublei">
                <View className="p-4">
                  <Text className="mb-4 text-gray-700 dark:text-gray-300">
                    Khublei shibun ba phi la jied ia ka kot jingrwai.
                  </Text>
                </View>
              </ContentSection>

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
    </Container>
  );
};
