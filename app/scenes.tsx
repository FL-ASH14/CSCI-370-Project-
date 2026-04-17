import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../supabase'; 

export default function ScenesScreen() {
  const router = useRouter();
  const { movie } = useLocalSearchParams();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [scenesData, setScenesData] = useState<any[]>([]);

  useEffect(() => {
    loadScenes();
    loadFavorites();
  }, [movie]);

  const loadScenes = async () => {
    try {
      const { data, error } = await supabase
        .from('scenes')
        .select('*')
        .eq('movie_id', movie);

      if (error) throw error;
      if (data) setScenesData(data);
    } catch (error) {
      console.error('Error fetching scenes from cloud:', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase.from('favorites').select('scene_id');
      
      if (error) throw error;
      if (data) {
        // Converts the database rows into a simple array of IDs
        const favIds = data.map(fav => fav.scene_id);
        setFavorites(favIds);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (sceneId: string) => {
    try {
      const isFavorite = favorites.includes(sceneId);
      let updatedFavorites = [...favorites];
      if (isFavorite) {
        updatedFavorites = updatedFavorites.filter(id => id !== sceneId);
      } else {
        updatedFavorites.push(sceneId);
      }
      setFavorites(updatedFavorites);

      // Checks if the favorite is in the table if it is then deletes else inserts 
      if (isFavorite) {
        await supabase.from('favorites').delete().eq('scene_id', sceneId);
      } else {
        await supabase.from('favorites').insert({ scene_id: sceneId });
      }

    } catch (error) {
      console.error('Error saving to cloud:', error);
    }
  };

  let displayTitle = 'Movie Locations';
  if (movie === '1') {
    displayTitle = 'Star Wars Locations';
  } else if (movie === '2') {
    displayTitle = 'Harry Potter Locations';
  } else if (movie === '3') {
    displayTitle = 'The Notebook Locations';
  } else if (movie === '4') {
    displayTitle = 'Fast & Furious Locations';
  } else if (movie === '5') {
    displayTitle = 'The Truman Show Locations';
  } else if (movie === '6') {
    displayTitle = 'Percy Jackson Locations';
  }

  const routeToMapLocation = (lat: number, lng: number) => {
    router.push({
      pathname: '/(tabs)/map',
      params: { lat: lat, lng: lng }
    });
  };

  const renderSceneCard = ({ item }: { item: any }) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <TouchableOpacity 
        style={styles.cardContainer}
        onPress={() => routeToMapLocation(item.latitude, item.longitude)}
      >
        <Image source={{ uri: item.image_url }} style={styles.cardImage} resizeMode="cover" />
        
        <View style={styles.cardBanner}>
            <View style={styles.textColumn}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardLocation}>{item.location}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>

            <TouchableOpacity
              style={styles.heartButton} 
              onPress={() => toggleFavorite(item.id)}
            >
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={28} 
                color="#FF69B4" 
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{displayTitle}</Text>
      <FlatList
        data={scenesData}
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
     marginBottom: 25, 
     overflow: 'hidden' 
    },
  cardImage: { 
    width: '100%', 
    height: 180, 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15 
  },
  cardBanner: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#2a0a40', 
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15 
  },
  textColumn: {
    flex: 1, 
    paddingRight: 10,
  },
  heartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
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