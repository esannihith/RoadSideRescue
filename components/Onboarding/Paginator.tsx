import type { OnboardingItem } from '@/data/OnboardingData';
import React from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';

type Props = {
  data: OnboardingItem[];
  scrollX: Animated.Value;
};

const Paginator: React.FC<Props> = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-row items-center justify-center my-4">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

  const scale: Animated.AnimatedInterpolation<number> = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
  }) as Animated.AnimatedInterpolation<number>;

  const opacity: Animated.AnimatedInterpolation<number> = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
  }) as Animated.AnimatedInterpolation<number>;

        return (
          <Animated.View
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 6,
              backgroundColor: '#3b82f6',
              transform: [{ scale }],
              opacity,
            }}
          />
        );
      })}
    </View>
  );
};

export default Paginator;
