import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { OnboardingItem as OnboardingItemType } from '../data/OnboardingData';

const { width } = Dimensions.get('window');

interface OnboardingItemProps {
  item: OnboardingItemType;
  index: number;
  isLastSlide: boolean;
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({ item, index, isLastSlide }) => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth');
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.Circle;
  };

  return (
    <View style={{ width }} className="flex-1 justify-center items-center px-6 bg-white">
      {/* Image */}
      <View className="flex-1 justify-center items-center">
        <Image
          source={item.image}
          className="w-80 h-80 mt-6"
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View className="flex-1 justify-start items-center pt-8">
        {/* Title */}
        <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
          {item.title}
        </Text>

        {/* Description */}
        <Text className="text-lg text-gray-600 text-center mb-8 leading-6">
          {item.description}
        </Text>

        {/* Footer Icons */}
        <View className="flex-row justify-center space-x-8 mb-8">
          {item.footer.map((footerItem, idx) => {
            const IconComponent = getIconComponent(footerItem.icon);
            return (
              <View key={idx} className="flex-row items-center mr-6">
                <View className="w-12 h-12 rounded-full bg-gray-100 justify-center items-center mr-1">
                  <IconComponent size={24} color={footerItem.color} />
                </View>
                <Text className="text-sm text-gray-600 font-medium">
                  {footerItem.label}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Get Started Button - Only on last slide */}
        {isLastSlide && (
          <TouchableOpacity
            onPress={handleGetStarted}
            className="bg-blue-600 py-4 px-12 rounded-xl mb-4 self-center"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Get Started
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OnboardingItem;