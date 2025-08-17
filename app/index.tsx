import React, { useState, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Animated, 
  ViewToken,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import OnboardingData, { OnboardingItem as OnboardingItemType } from '../data/OnboardingData';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';

export default function OnboardingScreen() {
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
    router.push('/auth');
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
      <View className="flex-3">
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