import { Redirect } from 'expo-router';
import { useUserStore } from '@/stores/userStore';

export default function IndexRedirect() {
  const { isAuthenticated, isNewUser, token } = useUserStore();

  // If user is authenticated and not new, go to main app
  if (isAuthenticated && token && !isNewUser) {
    return <Redirect href="/(main)" />;
  }

  // If user is authenticated but new, go to complete profile
  if (isAuthenticated && token && isNewUser) {
    return <Redirect href="/(auth)/complete-profile" />;
  }

  // If not authenticated, go to auth flow (which will show onboarding)
  return <Redirect href="/(auth)" />;
}