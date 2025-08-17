import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Car } from 'lucide-react-native';
import { userService } from '@/services/userService';
import { useUserStore } from '@/stores/userStore';

export default function CompleteProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateUser, clearNewUserFlag } = useUserStore();

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setLoading(true);
    try {
      const response = await userService.updateProfile({
        name: name.trim(),
        email: email.trim() || undefined,
      });

      updateUser(response.user);
      clearNewUserFlag();
      router.replace('/(main)');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="flex-1 px-6 pt-16">
        {/* Logo Section */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-blue-600 rounded-2xl justify-center items-center mb-4">
            <Car size={40} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </Text>
          <Text className="text-gray-600 text-center text-base">
            Tell us a bit about yourself
          </Text>
        </View>

        {/* Form Section */}
        <View className="mb-8 space-y-4">
          {/* Name Input */}
          <View className="mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Full Name *
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-lg p-4 text-base"
            />
          </View>

          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Email (Optional)
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-300 rounded-lg p-4 text-base"
            />
          </View>
        </View>

        {/* Complete Profile Button */}
        <TouchableOpacity
          onPress={handleUpdateProfile}
          disabled={loading}
          className={`py-4 rounded-lg items-center ${
            loading ? 'bg-gray-400' : 'bg-blue-600'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-semibold">Complete Profile</Text>
          )}
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity 
          onPress={() => {
            clearNewUserFlag();
            router.replace('/(main)');
          }}
          className="items-center mt-6"
        >
          <Text className="text-gray-600 text-base">
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
