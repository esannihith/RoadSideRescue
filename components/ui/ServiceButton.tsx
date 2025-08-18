import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface ServiceButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  backgroundColor?: string;
}

export const ServiceButton: React.FC<ServiceButtonProps> = ({
  icon,
  label,
  onPress,
  backgroundColor = 'bg-gray-50'
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${backgroundColor} rounded-2xl p-4 items-center justify-center flex-1 mx-1 mb-3 min-h-[100px]`}
    >
      <View className="mb-2">
        {icon}
      </View>
      <Text className="text-sm font-medium text-gray-900 text-center">
        {label}
      </Text>
    </TouchableOpacity>
  );
};