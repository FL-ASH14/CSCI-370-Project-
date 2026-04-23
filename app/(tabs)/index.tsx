import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import * as Notifications from "expo-notifications";

interface Movie {
  id: string;
  imageUrl: string;
}

const moviesData = [
  { id: '1', imageUrl: 'https://specials-images.forbesimg.com/imageserve/65f7875b62d7ee03f5c98b3f/960x0.jpg' },
  { id: '2', imageUrl: 'https://m.media-amazon.com/images/I/718OJKgQOcL._AC_SL1024_.jpg' },
  { id: '3', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjE0ZjgzMzYtMTAxYi00NGMzLThmZDktNzFlMzA2MWRmYWQ0XkEyXkFqcGc@._V1_.jpg' },
  { id: '4', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_.jpg' },
  { id: '5', imageUrl: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/192/2023/08/15115111/vuza0WqY239yBXOadKlGwJsZJFE.jpg' },
  { id: '6', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZDE4M2ZiYzEtODJiZC00NmI1LWFlNTgtOGJlNTY3NmExYWNjXkEyXkFqcGc@._V1_.jpg' }
];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true, 
    shouldShowList: true
  }),
});

export default function Home() {
  const router = useRouter();
  
  //This gives an alert to enable notifications and links to Settings if permissions are denied
  useEffect(() => {
    const requestNotifPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          "Notifications Disabled",
          "Please go to your phone settings and enable notifications.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() }
          ]
        );
      }
    };
    requestNotifPermissions();
  }, []);

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <TouchableOpacity 
      style={styles.cardWrapper}
      onPress={() => router.push({
        pathname: '/scenes',
        params: { movie: item.id }
      })}
    >
      <Image source={{ uri: item.imageUrl }} 
      style={styles.posterImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Welcome to Film Finder</Text>
      <FlatList
        data={moviesData}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieCard}
        numColumns={2}
        columnWrapperStyle={styles.rowWrapper}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0A18', paddingHorizontal: 15 },
  headerTitle: { 
    color: '#FF69B4', 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginTop: 40, 
    marginBottom: 20,
    textAlign: 'center'
  },
  listPadding: { 
    paddingBottom: 30 
  },
  rowWrapper: { 
    justifyContent: 'space-between' 
  },
  cardWrapper: { 
    width: '47%', 
    height: 260, 
    marginBottom: 20, 
    borderRadius: 10, 
    overflow: 'hidden' 
  },
  posterImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  }
});