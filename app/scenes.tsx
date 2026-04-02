import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const starWarsScenes = [
  {
    id: '1',
    title: 'Tatooine (A New Hope)',
    location: 'Death Valley, California',
    description: 'The iconic scenes of R2-D2 and C3-PO wandering the desert dunes were filmed right here.',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/5196dd82e4b0ef02d1bb4fef/1448845961723-PH11FTQE4H0CAQ7BTREV/star-wars-artoo-sand-dunes.jpg',
    coordinate: { latitude: 36.4614, longitude: -116.8656 },
  },
  {
    id: '2',
    title: 'The Great Pit of Carkoon (Return of the Jedi)',
    location: 'Buttercup Dunes, California',
    description: 'Where the iconic Sarlacc pit battle from Return of the Jedi took place.',
    imageUrl: 'https://www.desertusa.com/sandhills/photos/5F3A9068_150422.jpg',
    coordinate: { latitude: 32.7667, longitude: -114.9333 },
  },
  {
    id: '3', 
    title: 'Ahch-To (The Force Awakens)',
    location: 'Skellig Michael, Ireland',
    description: 'Luke Skywalker\'s isolated island retreat, this is the scene where Ray finds Luke Skywalker.',
    imageUrl: 'https://www.kevinandamanda.com/wp-content/uploads/2017/09/skellig-michael-star-wars-force-awakens-luke-island-02.jpg', 
    coordinate: { latitude: 51.7714, longitude: -10.5398 },
  }
];

export default function ScenesScreen() {
  const router = useRouter();

  const routeToMapLocation = (lat: number, lng: number) => {
    router.push({
      pathname: '/(tabs)/map',
      params: { lat: lat, lng: lng }
    });
  };

  const renderSceneCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={() => routeToMapLocation(item.coordinate.latitude, item.coordinate.longitude)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="cover" />
      
      <View style={styles.cardBanner}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Star Wars Locations</Text>
      <FlatList
        data={starWarsScenes}
        keyExtractor={(item) => item.id}
        renderItem={renderSceneCard}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F0A18', 
    alignItems: 'center' 
},
  headerTitle: { 
    color: '#FF69B4', 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginTop: 20, 
    marginBottom: 20 
},
  listPadding: { 
    paddingBottom: 40 
},
  cardContainer: { 
    width: 340, 
    backgroundColor: '#3e1260', 
    borderRadius: 15, 
    marginBottom: 25 
},
  cardImage: { 
    width: '100%', 
    height: 180, 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15 
},
  cardBanner: { 
    padding: 15, 
    backgroundColor: '#2a0a40', 
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15 
},
  cardTitle: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 4 
},
  cardLocation: { 
    color: '#FF69B4', 
    fontSize: 12, 
    marginBottom: 8 
},
  cardDescription: { 
    color: 'white', 
    fontSize: 12, 
    opacity: 0.8, 
    lineHeight: 16 
}
});