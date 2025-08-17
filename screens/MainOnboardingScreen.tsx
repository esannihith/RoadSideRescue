import { OnboardingSlide, Paginator } from '@/components/Onboarding';
import onboardingData from '@/data/OnboardingData';
import * as Lucide from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Animated, FlatList, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function MainOnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<any> | null>(null);
  const { width } = useWindowDimensions();

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // TODO: navigate to next screen
      console.log('Finished onboarding');
    }
  };

  const iconSize = Math.max(18, Math.round(width * 0.05));

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <View className="w-full flex-1">
        <FlatList
          data={onboardingData}
          renderItem={({ item }) => (
            <View style={{ width }}>
              <OnboardingSlide data={item} width={width} />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <Paginator data={onboardingData} scrollX={scrollX} />

      {/* footer icons displayed below paginator */}
      <View className="w-full items-center mt-3">
        <View className="flex-row justify-center space-x-8">
          {(onboardingData[currentIndex]?.footer ?? []).map((f) => {
            const IconComponent = (Lucide as any)[f.icon];
            return (
              <View key={f.label} className="items-center">
                {IconComponent ? (
                  <IconComponent color={f.color} size={iconSize} />
                ) : null}
                <Text className="text-xs text-gray-600 mt-1">{f.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <TouchableOpacity className="absolute bottom-12 w-11/12 items-center" onPress={scrollTo}>
        <View className="bg-blue-500 rounded-full py-3 w-full items-center">
          <Text className="text-white font-bold">
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
