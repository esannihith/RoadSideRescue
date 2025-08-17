import React from 'react';
import { Redirect } from 'expo-router';
import { useUserStore } from '@/stores/userStore';

export default function AuthIndex() {
  const { isAuthenticated, token } = useUserStore();

  // If user is already authenticated, redirect to main app
  if (isAuthenticated && token) {
    return <Redirect href="/(main)" />;
  }

  // If not authenticated, show onboarding screen by default
  return <Redirect href="./onboarding" />;
}