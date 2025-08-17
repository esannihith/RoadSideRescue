import React from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { OnboardingItem } from '../data/OnboardingData';

const { width } = Dimensions.get('window');

interface PaginatorProps {
  data: OnboardingItem[];
  scrollX: Animated.Value;
}

const Paginator: React.FC<PaginatorProps> = ({ data, scrollX }) => {
  return (
    <View className="flex-row justify-center items-center py-4">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i.toString()}
            style={{
              height: 8,
              width: dotWidth,
              opacity,
            }}
            className="bg-blue-600 mx-1 rounded-full"
          />
        );
      })}
    </View>
  );
};

export default Paginator;