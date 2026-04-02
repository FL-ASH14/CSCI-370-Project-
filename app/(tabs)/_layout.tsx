import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerStyle: { backgroundColor: '#3e1260' },
        tabBarStyle: { backgroundColor: '#3e1260' },
        tabBarActiveTintColor: '#c612da',
        tabBarInactiveTintColor: '#d9a3fb',
      }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          headerTitle: () => null, // header shown with no title
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={28} color={color}/>
          ),
        }}/>
      <Tabs.Screen 
        name="map" 
        options={{ 
          title: 'Map' ,
          headerTitle: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={28} color={color}/>
          ),
        }}/>
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          headerTitle: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={28} color={color}/>
          ),
        }}/>
    </Tabs>
  ); 
}; 