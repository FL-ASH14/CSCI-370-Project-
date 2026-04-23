import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from './AuthContext';
import { useEffect } from 'react';

// This Checks if you are logged in 
function InitialLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is currently on the login screen
    const inAuthGroup = segments[0] === 'login';

    if (!isAuthenticated && !inAuthGroup) {
      // Kick them out to the login screen if they aren't authenticated
      router.replace('/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Send them inside the app if they are already logged in
      router.replace('/(tabs)/');
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="scenes" options={{ title: 'Scenes' }} />
    </Stack>
  );
}

// The Wrapper function 
export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}