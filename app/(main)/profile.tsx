import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Mail, Phone } from 'lucide-react-native';
import { ScreenLayout, Header, InputField, Button } from '@/components/ui';
import { userService } from '@/services/userService';
import { useUserStore } from '@/stores/userStore';
import { validateName, validateEmail } from '@/utils';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const router = useRouter();
  const { user, updateUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!validateName(name)) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (email && !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async () => {
    if (!validateForm()) {
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
      setErrors({});
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
    setErrors({});
    setIsEditing(false);
  };

  return (
    <ScreenLayout scrollable>
      <View className="flex-1">
        {/* Header */}
        <Header 
          title="Profile" 
          showBackButton 
          rightComponent={
            !isEditing ? (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text className="text-blue-600 text-base font-semibold">Edit</Text>
              </TouchableOpacity>
            ) : null
          }
        />

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
              <InputField
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                error={errors.name}
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
              <InputField
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
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
            <Button
              title="Cancel"
              variant="secondary"
              onPress={handleCancel}
              className="flex-1"
            />

            <Button
              title="Save Changes"
              onPress={handleUpdateProfile}
              loading={loading}
              className="flex-1"
            />
          </View>
        )}
      </View>
    </ScreenLayout>
  );
}
