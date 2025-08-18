import React from 'react';
import { View, Text } from 'react-native';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
  backgroundColor = 'bg-blue-50',
  children
}) => {
  return (
    <View className={`${backgroundColor} rounded-2xl p-4 mb-4`}>
      <View className="flex-row items-center">
        {icon && (
          <View className="mr-3">
            {icon}
          </View>
        )}
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 mb-1">
            {title}
          </Text>
          <Text className="text-sm text-gray-600">
            {description}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
};