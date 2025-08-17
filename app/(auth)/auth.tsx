import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { Car, Shield } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useRouter } from 'expo-router';
import { authService } from '@/services/authService';

export default function AuthScreen() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formatPhoneNumber = (number: string) => {
    // Remove any non-digit characters
    const cleaned = number.replace(/\D/g, '');
    
    // Add +91 prefix if not present and number is 10 digits
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    } else if (cleaned.startsWith('91') && cleaned.length === 12) {
      return `+${cleaned}`;
    } else if (cleaned.startsWith('91') && cleaned.length === 11) {
      return `+${cleaned}`;
    }
    
    return number;
  };

  const handleContinue = async () => {
    if (mobileNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }

    const formattedNumber = formatPhoneNumber(mobileNumber);
    
    // Basic validation for Indian phone numbers
    if (!/^\+91[6-9]\d{9}$/.test(formattedNumber)) {
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
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      
      let errorMessage = 'Failed to send OTP';
      
      // Check for specific error types
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
    // Placeholder function for Google sign-in
    Alert.alert('Google Sign In', 'Google sign-in functionality will be implemented here');
  };

  const handleAppleSignIn = () => {
    // Placeholder function for Apple sign-in
    Alert.alert('Apple Sign In', 'Apple sign-in functionality will be implemented here');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Support contact functionality will be implemented here');
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="flex-1 px-6 pt-16">
        {/* Logo and Welcome Section */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-blue-600 rounded-2xl justify-center items-center mb-4">
            <Car size={40} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to RoadAssist
          </Text>
        </View>

        {/* Mobile Number Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-3">
            Mobile Number
          </Text>
          
          <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-4">
            <Text className="text-gray-600 text-base mr-3">+91</Text>
            <TextInput
              className="flex-1 text-base text-gray-900"
              placeholder="Enter 10-digit mobile number"
              placeholderTextColor="#9CA3AF"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          onPress={handleContinue}
          disabled={loading}
          className={`py-4 rounded-xl mb-6 ${
            loading ? 'bg-gray-400' : 'bg-blue-600'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-semibold text-center">
              Send OTP
            </Text>
          )}
        </TouchableOpacity>

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
        {/* --- CHANGE 3: Added more space between buttons (space-x-6) --- */}
        <View className="flex-row space-x-6 mb-8">
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
    </ScrollView>
  );
}
