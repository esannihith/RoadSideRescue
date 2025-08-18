import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { 
  User, 
  History, 
  CreditCard, 
  Gift, 
  HelpCircle, 
  Settings, 
  ArrowRight,
  LogOut 
} from 'lucide-react-native';
import { useUserStore } from '@/stores/userStore';

interface DrawerContentProps {
  navigation: any;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({ navigation }) => {
  const { user, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/onboarding');
  };

  const menuItems = [
    {
      icon: User,
      label: 'Profile & Vehicles',
      onPress: () => {
        navigation.closeDrawer();
        router.push('./profile');
      }
    },
    {
      icon: History,
      label: 'Service History',
      onPress: () => Alert.alert('Service History', 'Service history functionality will be implemented here')
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      onPress: () => Alert.alert('Payment Methods', 'Payment methods functionality will be implemented here')
    },
    {
      icon: Gift,
      label: 'Promotions',
      onPress: () => Alert.alert('Promotions', 'Promotions functionality will be implemented here')
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      onPress: () => Alert.alert('Help & Support', 'Help & support functionality will be implemented here')
    },
    {
      icon: Settings,
      label: 'Settings',
      onPress: () => Alert.alert('Settings', 'Settings functionality will be implemented here')
    }
  ];

  return (
    <DrawerContentScrollView className="flex-1 bg-white">
      <View className="flex-1">
        {/* User Profile Section */}
        <View className="bg-blue-50 p-6 mb-6">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-blue-600 rounded-full justify-center items-center mr-4">
              <User size={32} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">
                {user?.name || 'User'}
              </Text>
              <Text className="text-sm text-gray-600">
                {user?.phoneNumber || 'Phone not set'}
              </Text>
            </View>
            <TouchableOpacity>
              <ArrowRight size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={item.onPress}
                  className="flex-row items-center py-4"
                >
                  <IconComponent size={24} color="#6b7280" />
                  <Text className="text-base text-gray-900 ml-4 flex-1">
                    {item.label}
                  </Text>
                  <ArrowRight size={20} color="#6b7280" />
                </TouchableOpacity>
                {index < menuItems.length - 1 && (
                  <View className="h-px bg-gray-200" />
                )}
              </View>
            );
          })}
        </View>

        {/* Logout Button */}
        <View className="px-4 mt-8">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center py-4 border-t border-gray-200"
          >
            <LogOut size={24} color="#ef4444" />
            <Text className="text-base text-red-500 ml-4 flex-1">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};