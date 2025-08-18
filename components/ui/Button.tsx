import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  icon,
  disabled,
  className,
  ...props
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600';
      case 'secondary':
        return 'bg-gray-200';
      case 'danger':
        return 'bg-red-600';
      case 'outline':
        return 'border border-blue-600 bg-transparent';
      default:
        return 'bg-blue-600';
    }
  };

  const getSizeStyles = (): string => {
    switch (size) {
      case 'small':
        return 'py-2 px-4';
      case 'medium':
        return 'py-3 px-6';
      case 'large':
        return 'py-4 px-8';
      default:
        return 'py-3 px-6';
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'secondary':
        return 'text-gray-700';
      case 'outline':
        return 'text-blue-600';
      default:
        return 'text-white';
    }
  };

  const getTextSize = (): string => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const baseStyles = `
    rounded-xl items-center justify-center flex-row
    ${getVariantStyles()}
    ${getSizeStyles()}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50' : ''}
  `;

  const textStyles = `
    font-semibold text-center
    ${getTextColor()}
    ${getTextSize()}
    ${icon ? 'ml-2' : ''}
  `;

  return (
    <TouchableOpacity
      className={`${baseStyles} ${className || ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#374151' : '#ffffff'} />
      ) : (
        <>
          {icon}
          <Text className={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
