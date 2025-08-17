import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
  ViewToken
} from 'react-native';
import { OnboardingItem, Paginator } from '@/components/Onboarding';
import OnboardingData, { OnboardingItem as OnboardingItemType } from '@/data/OnboardingData';

export default function OnBoardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<OnboardingItemType>>(null);
  const router = useRouter();

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleSkip = () => {
    router.push('/screens/auth');
  };

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: false }
    )(event);
  }, [scrollX]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      {/* Skip Button */}
      <View className="absolute top-12 right-6 z-10">
        <TouchableOpacity onPress={handleSkip} className="py-2 px-4">
          <Text className="text-gray-500 text-lg font-medium">Skip</Text>
        </TouchableOpacity>
      </View>
      {/* Onboarding Slides */}
      <View className="flex-1">
        <FlatList
          data={OnboardingData}
          renderItem={({ item, index }) => (
            <OnboardingItem 
              item={item} 
              index={index} 
              isLastSlide={index === OnboardingData.length - 1}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={handleScroll}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          scrollEventThrottle={32}
        />
      </View>
      {/* Paginator */}
      <Paginator data={OnboardingData} scrollX={scrollX} />
    </View>
  );
}
