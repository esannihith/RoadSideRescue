import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { Car, Shield } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function AuthScreen() {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleContinue = () => {
    if (mobileNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }
    // Placeholder function for mobile number authentication
    Alert.alert('Success', `Continuing with mobile number: +91 ${mobileNumber}`);
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
        {/* App Logo and Branding */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-blue-600 rounded-2xl justify-center items-center mb-4">
            <Car size={40} color="white" />
          </View>
          
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            RoadAssist
          </Text>
          
          <Text className="text-gray-500 text-base">
            Help is on the way
          </Text>
        </View>

        {/* --- CHANGE 1: Centered the entire welcome section --- */}
        <View className="mb-8 items-center">
          {/* --- CHANGE 2: Removed "back" from the welcome text --- */}
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Welcome
          </Text>
          <Text className="text-gray-600 text-base">
            Enter your mobile number to continue
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
          className="bg-blue-600 py-4 rounded-xl mb-6"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Continue
          </Text>
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