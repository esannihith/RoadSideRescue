import React from 'react';
import { View } from 'react-native';
import { Car } from 'lucide-react-native';

interface AppLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({ size = 'medium', className = '' }) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { container: 'w-16 h-16', icon: 32 };
      case 'medium':
        return { container: 'w-20 h-20', icon: 40 };
      case 'large':
        return { container: 'w-24 h-24', icon: 48 };
      default:
        return { container: 'w-20 h-20', icon: 40 };
    }
  };

  const styles = getSizeStyles();

  return (
    <View className={`${styles.container} bg-blue-600 rounded-2xl justify-center items-center ${className}`}>
      <Car size={styles.icon} color="white" />
    </View>
  );
};
