import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface ScreenLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
  statusBarStyle?: 'auto' | 'inverted' | 'light' | 'dark';
  padding?: boolean;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  scrollable = false,
  className = '',
  statusBarStyle = 'dark',
  padding = true,
}) => {
  const baseStyles = `
    flex-1 bg-white
    ${padding ? 'px-6 pt-16' : ''}
  `;

  const Container = scrollable ? ScrollView : View;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style={statusBarStyle} />
      <Container className={`${baseStyles} ${className}`}>
        {children}
      </Container>
    </SafeAreaView>
  );
};
