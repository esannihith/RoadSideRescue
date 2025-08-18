import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  required = false,
  icon,
  fullWidth = true,
  className,
  ...props
}) => {
  const inputStyles = `
    border rounded-xl px-4 py-4 text-base text-gray-900
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${fullWidth ? 'w-full' : ''}
  `;

  return (
    <View className={`${fullWidth ? 'w-full' : ''} ${className || ''}`}>
      {label && (
        <Text className="text-base font-semibold text-gray-900 mb-2">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}
      
      <View className="relative">
        {icon && (
          <View className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            {icon}
          </View>
        )}
        
        <TextInput
          className={`${inputStyles} ${icon ? 'pl-12' : ''}`}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
      </View>
      
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};
