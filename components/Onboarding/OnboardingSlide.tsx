import type { OnboardingItem } from '@/data/onboardingData';
import React from 'react';
import { Image, Text, View } from 'react-native';

type Props = {
  data: OnboardingItem;
  width: number;
};

export default function OnboardingSlide({ data, width }: Props) {
  const imageWidth = Math.min(width * 0.75, 360);
  const imageHeight = Math.min(imageWidth * 0.8, 300);

  return (
    <View style={{ width, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Image source={data.image} style={{ width: imageWidth, height: imageHeight, resizeMode: 'contain' }} />

      <View style={{ marginTop: 12, width: '100%', alignItems: 'center' }}>
        <Text className="text-2xl font-bold text-center" style={{ lineHeight: 34 }}>
          {data.title}
        </Text>

        <Text className="text-base text-gray-500 text-center mt-3" style={{ lineHeight: 22 }}>
          {data.description}
        </Text>
      </View>
    </View>
  );
}