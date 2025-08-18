import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Shield } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, InputField, ScreenLayout, AppLogo } from '@/components/ui';
import { authService } from '@/services/authService';
import { formatPhoneNumber, validateIndianPhoneNumber } from '@/utils';

export default function AuthScreen() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (mobileNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }

    const formattedNumber = formatPhoneNumber(mobileNumber);
    
    if (!validateIndianPhoneNumber(formattedNumber)) {
      Alert.alert('Error', 'Please enter a valid Indian phone number');
      return;
    }

    setLoading(true);
    try {
      await authService.sendOtp({ phoneNumber: formattedNumber });
      router.push({
        pathname: './otp-verification',
        params: { phoneNumber: formattedNumber }
      });
    } catch (error: any) {
      console.error('OTP Error:', error);
      
      let errorMessage = 'Failed to send OTP';
      
      if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        errorMessage = 'Network error: Cannot connect to server. Please check if the backend is running on localhost:3000';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Connection refused: Backend server is not running on localhost:3000';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    Alert.alert('Google Sign In', 'Google sign-in functionality will be implemented here');
  };

  const handleAppleSignIn = () => {
    Alert.alert('Apple Sign In', 'Apple sign-in functionality will be implemented here');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Support contact functionality will be implemented here');
  };

  return (
    <ScreenLayout scrollable>
      <View className="flex-1">
        {/* Logo and Welcome Section */}
        <View className="items-center mb-8">
          <AppLogo className="mb-4" />
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to RoadAssist
          </Text>
        </View>

        {/* Mobile Number Input */}
        <View className="mb-6">
          <InputField
            label="Mobile Number"
            placeholder="Enter 10-digit mobile number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="numeric"
            maxLength={10}
            icon={<Text className="text-gray-600 text-base">+91</Text>}
          />
        </View>

        {/* Continue Button */}
        <Button
          title="Send OTP"
          onPress={handleContinue}
          loading={loading}
          fullWidth
          className="mb-6"
        />

        {/* Terms and Privacy */}
        <Text className="text-center text-sm text-gray-500 mb-8">
          By continuing, you agree to our{' '}
          <Text className="text-blue-600">Terms of Service</Text> and{' '}
          <Text className="text-blue-600">Privacy Policy</Text>
        </Text>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">or continue with</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Social Sign In Buttons */}
        <View className="flex-row space-x-4 mb-8">
          <TouchableOpacity 
            onPress={handleGoogleSignIn}
            className="flex-1 flex-row items-center justify-center border border-gray-300 py-4 rounded-xl mr-3"
          >
            <FontAwesome name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
            <Text className="text-gray-700 font-medium">Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleAppleSignIn}
            className="flex-1 flex-row items-center justify-center border border-gray-300 py-4 rounded-xl"
          >
            <FontAwesome name="apple" size={20} color="#111827" style={{ marginRight: 8 }} />
            <Text className="text-gray-700 font-medium">Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Support */}
        <TouchableOpacity onPress={handleContactSupport} className="items-center mb-4">
          <Text className="text-blue-600 font-medium">Need help?</Text>
          <Text className="text-blue-600 font-semibold">Contact Support</Text>
        </TouchableOpacity>

        {/* Security Badge */}
        <View className="flex-row items-center justify-center mb-8">
          <Shield size={16} color="#6B7280" />
          <Text className="text-gray-500 text-sm ml-2">Secure & Encrypted</Text>
        </View>
      </View>
    </ScreenLayout>
  );
}
