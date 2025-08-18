import { Drawer } from 'expo-router/drawer';
import { DrawerContent } from '@/components/DrawerContent';

export default function MainLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="index" />
      <Drawer.Screen name="profile" />
    </Drawer>
  );
}