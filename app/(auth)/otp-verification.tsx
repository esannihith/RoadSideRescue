import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, InputField, ScreenLayout, AppLogo } from '@/components/ui';
import { authService } from '@/services/authService';
import { useUserStore } from '@/stores/userStore';

export default function OtpVerificationScreen() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const setAuthData = useUserStore(state => state.setAuthData);

  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number not found');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOtp({
        phoneNumber: phoneNumber,
        otp: otp
      });

      setAuthData({
        user: response.user,
        token: response.token,
        isNewUser: response.isNewUser
      });

      if (response.isNewUser) {
        router.replace('./complete-profile');
      } else {
        router.replace('/(main)');
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!phoneNumber) return;
    
    try {
      await authService.sendOtp({ phoneNumber });
      Alert.alert('Success', 'OTP sent successfully');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <ScreenLayout>
      <View className="flex-1">
        {/* Logo Section */}
        <View className="items-center mb-12">
          <AppLogo className="mb-4" />
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Verify OTP
          </Text>
          <Text className="text-gray-600 text-center text-base">
            Enter the 6-digit code sent to{'\n'}{phoneNumber}
          </Text>
        </View>

        {/* OTP Input Section */}
        <View className="mb-8">
          <InputField
            value={otp}
            onChangeText={setOtp}
            placeholder="123456"
            keyboardType="number-pad"
            maxLength={6}
            className="text-center text-2xl font-bold tracking-widest"
          />
        </View>

        {/* Verify Button */}
        <Button
          title="Verify OTP"
          onPress={handleVerifyOtp}
          loading={loading}
          fullWidth
          className="mb-4"
        />

        {/* Resend OTP */}
        <TouchableOpacity onPress={handleResendOtp} className="items-center">
          <Text className="text-blue-600 text-base font-medium">
            Didn't receive OTP? Resend
          </Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="items-center mt-6"
        >
          <Text className="text-gray-600 text-base">
            ← Back to phone number
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}
