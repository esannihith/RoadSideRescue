import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, InputField, ScreenLayout, AppLogo } from '@/components/ui';
import { userService } from '@/services/userService';
import { useUserStore } from '@/stores/userStore';
import { validateName, validateEmail } from '@/utils';

export default function CompleteProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const router = useRouter();
  const { updateUser, clearNewUserFlag } = useUserStore();

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
      clearNewUserFlag();
      router.replace('/(main)');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    clearNewUserFlag();
    router.replace('/(main)');
  };

  return (
    <ScreenLayout>
      <View className="flex-1">
        {/* Logo Section */}
        <View className="items-center mb-12">
          <AppLogo className="mb-4" />
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </Text>
          <Text className="text-gray-600 text-center text-base">
            Tell us a bit about yourself
          </Text>
        </View>

        {/* Form Section */}
        <View className="mb-8 space-y-4">
          <InputField
            label="Full Name"
            required
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <InputField
            label="Email (Optional)"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
        </View>

        {/* Complete Profile Button */}
        <Button
          title="Complete Profile"
          onPress={handleUpdateProfile}
          loading={loading}
          fullWidth
          className="mb-4"
        />

        {/* Skip Option */}
        <TouchableOpacity onPress={handleSkip} className="items-center">
          <Text className="text-gray-600 text-base">
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}
