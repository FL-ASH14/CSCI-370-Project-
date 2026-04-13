import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="scenes" 
        options={{ 
        headerTitle: 'Movie Scenes', 
        headerStyle: { backgroundColor: '#0F0A18' }, 
        headerTintColor: '#FF69B4',
        headerBackTitle: 'Back' 
        }}/>
    </Stack>
  );
};