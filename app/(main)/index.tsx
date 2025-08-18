import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { User, LogOut } from 'lucide-react-native';
import { ScreenLayout, AppLogo, Button } from '@/components/ui';
import { useUserStore } from '@/stores/userStore';

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/onboarding');
  };

  return (
    <ScreenLayout scrollable>
      <View className="flex-1">
        {/* Header Section */}
        <View className="items-center mb-12">
          <AppLogo size="large" className="mb-6" />
          
          <Text className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Welcome to Road Side Rescue
          </Text>
          
          {user?.name && (
            <Text className="text-xl text-gray-600 text-center mb-2">
              Hello, {user.name}! 👋
            </Text>
          )}
          
          <Text className="text-base text-gray-500 text-center">
            Your trusted partner for roadside assistance
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </Text>
          
          <View className="space-y-3">
            <TouchableOpacity
              onPress={() => router.push('./profile')}
              className="flex-row items-center bg-blue-50 border border-blue-200 rounded-lg p-4"
            >
              <User size={24} color="#2563eb" />
              <View className="ml-3 flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  View Profile
                </Text>
                <Text className="text-sm text-gray-600">
                  Manage your account details
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <AppLogo size="small" />
              <View className="ml-3 flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  Request Assistance
                </Text>
                <Text className="text-sm text-gray-600">
                  Get help when you need it most
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info Card */}
        {user && (
          <View className="bg-gray-50 rounded-lg p-4 mb-8">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Account Information
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              Phone: {user.phoneNumber}
            </Text>
            {user.email && (
              <Text className="text-sm text-gray-600">
                Email: {user.email}
              </Text>
            )}
          </View>
        )}

        {/* Logout Button */}
        <Button
          title="Logout"
          variant="danger"
          onPress={handleLogout}
          fullWidth
          icon={<LogOut size={20} color="#ffffff" />}
        />
      </View>
    </ScreenLayout>
  );
}
