import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, Wrench, Battery, Truck, Fuel, Settings, MoveHorizontal as MoreHorizontal, CircleCheck as CheckCircle, Car, Plus } from 'lucide-react-native';
import { ScreenLayout, ServiceButton, InfoCard, Button } from '@/components/ui';
import { useUserStore } from '@/stores/userStore';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { user } = useUserStore();
  const navigation = useNavigation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleServicePress = (service: string) => {
    Alert.alert(service, `${service} functionality will be implemented here`);
  };

  const handleAddVehicle = () => {
    Alert.alert('Add Vehicle', 'Vehicle details functionality will be implemented here');
  };

  return (
    <ScreenLayout scrollable>
      <View className="flex-1">
        {/* Custom Header */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity onPress={openDrawer} className="p-2">
            <Menu size={24} color="#374151" />
          </TouchableOpacity>
          
          <View className="flex-1 ml-4">
            <Text className="text-lg font-medium text-gray-900">
              {getGreeting()}, {user?.name || 'User'}!
            </Text>
          </View>
        </View>

        {/* What do you need help with */}
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          What do you need help with?
        </Text>

        {/* Service Buttons Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          <ServiceButton
            icon={<Wrench size={32} color="#3b82f6" />}
            label="Flat Tyre"
            onPress={() => handleServicePress('Flat Tyre')}
            backgroundColor="bg-blue-50"
          />
          
          <ServiceButton
            icon={<Battery size={32} color="#22c55e" />}
            label="Battery Help"
            onPress={() => handleServicePress('Battery Help')}
            backgroundColor="bg-green-50"
          />
        </View>

        <View className="flex-row flex-wrap justify-between mb-6">
          <ServiceButton
            icon={<Truck size={32} color="#f97316" />}
            label="Towing Service"
            onPress={() => handleServicePress('Towing Service')}
            backgroundColor="bg-orange-50"
          />
          
          <ServiceButton
            icon={<Fuel size={32} color="#ef4444" />}
            label="Fuel Delivery"
            onPress={() => handleServicePress('Fuel Delivery')}
            backgroundColor="bg-red-50"
          />
        </View>

        <View className="flex-row flex-wrap justify-between mb-8">
          <ServiceButton
            icon={<Settings size={32} color="#8b5cf6" />}
            label="General Repair"
            onPress={() => handleServicePress('General Repair')}
            backgroundColor="bg-purple-50"
          />
          
          <ServiceButton
            icon={<MoreHorizontal size={32} color="#6b7280" />}
            label="More Services..."
            onPress={() => handleServicePress('More Services')}
            backgroundColor="bg-gray-50"
          />
        </View>

        {/* Assurance Card */}
        <InfoCard
          title="We're ready to help!"
          description="5+ mechanics are online near you"
          icon={
            <View className="w-12 h-12 bg-white rounded-full justify-center items-center">
              <CheckCircle size={24} color="#22c55e" />
            </View>
          }
          backgroundColor="bg-blue-50"
        />

        {/* Add Vehicle Card */}
        <View className="bg-orange-50 rounded-2xl p-4 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-900 mb-1">
              Add your vehicle details
            </Text>
            <Text className="text-sm text-gray-600">
              for faster service in the future
            </Text>
          </View>
          <Button
            title="Add Now"
            onPress={handleAddVehicle}
            size="small"
            className="ml-4"
          />
        </View>
      </View>
    </ScreenLayout>
  );
}