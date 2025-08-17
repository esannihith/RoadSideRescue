import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, User, Mail, Phone } from 'lucide-react-native';
import { userService } from '@/services/userService';
import { useUserStore } from '@/stores/userStore';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { user, updateUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

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
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
    setIsEditing(false);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="flex-1 px-6 pt-16">
        {/* Header */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 flex-1">
            Profile
          </Text>
          {!isEditing && (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text className="text-blue-600 text-base font-semibold">Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Info */}
        <View className="space-y-6">
          {/* Name Field */}
          <View>
            <View className="flex-row items-center mb-2">
              <User size={20} color="#6b7280" />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Full Name
              </Text>
            </View>
            {isEditing ? (
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            ) : (
              <View className="bg-gray-50 rounded-lg p-4">
                <Text className="text-base text-gray-900">
                  {user?.name || 'Not set'}
                </Text>
              </View>
            )}
          </View>

          {/* Email Field */}
          <View>
            <View className="flex-row items-center mb-2">
              <Mail size={20} color="#6b7280" />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Email Address
              </Text>
            </View>
            {isEditing ? (
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            ) : (
              <View className="bg-gray-50 rounded-lg p-4">
                <Text className="text-base text-gray-900">
                  {user?.email || 'Not set'}
                </Text>
              </View>
            )}
          </View>

          {/* Phone Field (Read-only) */}
          <View>
            <View className="flex-row items-center mb-2">
              <Phone size={20} color="#6b7280" />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Phone Number
              </Text>
            </View>
            <View className="bg-gray-100 rounded-lg p-4">
              <Text className="text-base text-gray-600">
                {user?.phoneNumber || 'Not set'}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View className="flex-row space-x-3 mt-8">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 py-4 rounded-lg items-center bg-gray-200"
            >
              <Text className="text-gray-700 text-base font-semibold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleUpdateProfile}
              disabled={loading}
              className={`flex-1 py-4 rounded-lg items-center ${
                loading ? 'bg-gray-400' : 'bg-blue-600'
              }`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-base font-semibold">Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
