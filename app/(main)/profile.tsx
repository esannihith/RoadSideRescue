import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  Phone, 
  Mail, 
  Users, 
  Calendar, 
  Award, 
  AlertTriangle,
  ArrowRight,
  HelpCircle
} from 'lucide-react-native';
import { ScreenLayout, Header } from '@/components/ui';
import { useUserStore } from '@/stores/userStore';

interface ProfileRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onPress?: () => void;
  showArrow?: boolean;
  valueColor?: string;
}

const ProfileRow: React.FC<ProfileRowProps> = ({ 
  icon, 
  label, 
  value, 
  onPress, 
  showArrow = true,
  valueColor = 'text-gray-900'
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center py-4"
        disabled={!onPress}
      >
        <View className="mr-4">
          {icon}
        </View>
        <View className="flex-1">
          <Text className="text-base font-medium text-gray-900 mb-1">
            {label}
          </Text>
          <Text className={`text-sm ${valueColor}`}>
            {value}
          </Text>
        </View>
        {showArrow && onPress && (
          <ArrowRight size={20} color="#6b7280" />
        )}
      </TouchableOpacity>
      <View className="h-px bg-gray-200 ml-12" />
    </View>
  );
};

export default function ProfileScreen() {
  const { user } = useUserStore();

  const handleEditField = (field: string) => {
    Alert.alert('Edit Field', `Edit ${field} functionality will be implemented here`);
  };

  const handleAddEmergencyContact = () => {
    Alert.alert('Emergency Contact', 'Add emergency contact functionality will be implemented here');
  };

  return (
    <ScreenLayout scrollable>
      <View className="flex-1">
        {/* Header */}
        <Header 
          title="Profile" 
          showBackButton 
          rightComponent={
            <TouchableOpacity onPress={() => Alert.alert('Help', 'Profile help will be implemented here')}>
              <View className="bg-gray-100 rounded-full p-2">
                <HelpCircle size={20} color="#6b7280" />
              </View>
            </TouchableOpacity>
          }
        />

        {/* Profile Information */}
        <View className="bg-white">
          <ProfileRow
            icon={<User size={24} color="#6b7280" />}
            label="Name"
            value={user?.name || 'Not set'}
            onPress={() => handleEditField('Name')}
          />

          <ProfileRow
            icon={<Phone size={24} color="#6b7280" />}
            label="Phone Number"
            value={user?.phoneNumber || 'Not set'}
            showArrow={false}
          />

          <ProfileRow
            icon={<Mail size={24} color="#6b7280" />}
            label="Email"
            value={user?.email || 'null'}
            onPress={() => handleEditField('Email')}
          />

          <ProfileRow
            icon={<Users size={24} color="#6b7280" />}
            label="Gender"
            value="Male"
            onPress={() => handleEditField('Gender')}
          />

          <ProfileRow
            icon={<Calendar size={24} color="#6b7280" />}
            label="Date of Birth"
            value="2004-07-23"
            onPress={() => handleEditField('Date of Birth')}
          />

          <ProfileRow
            icon={<Award size={24} color="#6b7280" />}
            label="Member Since"
            value="May 2022"
            showArrow={false}
          />

          <ProfileRow
            icon={<AlertTriangle size={24} color="#f97316" />}
            label="Emergency contact"
            value="Add"
            onPress={handleAddEmergencyContact}
            valueColor="text-blue-600"
          />
        </View>
      </View>
    </ScreenLayout>
  );
}