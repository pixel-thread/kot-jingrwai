import { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '~/src/components/ui/typography';
export const QuoteOfTheDay = () => {
  // https://beta.ourmanna.com/api/v1/get
  const fetchQuote = async () => {
    const res = await fetch('https://beta.ourmanna.com/api/v1/get');
    console.log(res);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View className="mb-6 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
      <Text size={'lg'} weight={'semibold'} className="mb-1">
        Quote of the Day
      </Text>
      <Text size={'base'} italic variant={'secondary'} className="mb-2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, possimus obcaecati!
        Excepturi ipsa earum, quos beatae eaque tenetur! Nisi nesciunt iste qui facilis blanditiis
        perferendis nihil doloribus enim dignissimos tempora.
      </Text>
      <Text size={'sm'} variant={'muted'} className="text-right">
        — Lorem Ipsum
      </Text>
    </View>
  );
};
