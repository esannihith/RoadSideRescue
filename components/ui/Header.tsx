import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightComponent,
  onBackPress,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center mb-8">
      {showBackButton && (
        <TouchableOpacity onPress={handleBackPress} className="mr-4">
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
      )}
      
      <Text className="text-2xl font-bold text-gray-900 flex-1">
        {title}
      </Text>
      
      {rightComponent}
    </View>
  );
};
