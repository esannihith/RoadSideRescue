import { Redirect } from 'expo-router';

export default function AuthIndex() {
  // Always redirect to onboarding for unauthenticated users
  return <Redirect href="./onboarding" />;
}