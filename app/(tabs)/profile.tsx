import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const router = useRouter();

  // user state
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [username, setUsername] = useState("@janedoe");
  const [favMovie, setFavMovie] = useState("");
  const [favShow, setFavShow] = useState("");

  const [favoriteScenes, setFavoriteScenes] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
      loadSavedLocations();
    }, [])
  );

  // Load the user's customized name from local storage
  const loadProfileData = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('userProfile');
      if (storedProfile !== null) {
        const profile = JSON.parse(storedProfile);
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setUsername(profile.username);
        setFavMovie(profile.favMovie);
        setFavShow(profile.favShow);
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  // Load the saved map locations from Supabase
  const loadSavedLocations = async () => {
    try {
      const { data: favData, error: favError } = await supabase.from('favorites').select('scene_id');
      if (favError) throw favError;

      if (favData && favData.length > 0) {
        const favoriteIds = favData.map(fav => fav.scene_id);
        const { data: scenesData, error: scenesError } = await supabase.from('scenes').select('*').in('id', favoriteIds); 
        if (scenesError) throw scenesError;
        if (scenesData) setFavoriteScenes(scenesData);
      } else {
        setFavoriteScenes([]); 
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  return ( 
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      
      {/* Settings */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={28} color='#d9a3fb'/>
        </TouchableOpacity>
      </View>

      {/* Matches the Image perfectly */}
      <View style={styles.identityContainer}>
        <Text style={styles.displayName}>{firstName} {lastName}</Text>
        <Text style={styles.username}>{username}</Text>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg' }}
        />
      </View>

      {/* Favorite Movies Section */}
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Favorite Movies</Text>
        {favMovie !== "" && <Text style={styles.favValue}>{favMovie}</Text>}
      </View>

      {/* Favorite Shows Section */}
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Favorite Shows</Text>
        {favShow !== "" && <Text style={styles.favValue}>{favShow}</Text>}
      </View>

      {/* Saved Locations Section */}
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Saved Locations</Text>
        
        {favoriteScenes.length === 0 ? (
          <Text style={styles.emptyText}>No locations saved yet.</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            {favoriteScenes.map((loc) => (
              <TouchableOpacity 
                key={loc.id} 
                style={styles.card}
                onPress={() => router.push({ pathname: '/(tabs)/map', params: { lat: loc.latitude, lng: loc.longitude } })}
              >
                <Image style={styles.image} source={{ uri: loc.image_url }}/>
                <View style={styles.titleBanner}>
                  <Text style={styles.cardSceneTitle} numberOfLines={1}>{loc.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0A18',
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  
  identityContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  displayName: {
    color: '#FF69B4',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  username: {
    color: '#d9a3fb',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 55,
    backgroundColor: '#FFFEE0',
  },
  
  contentSection: {
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  sectionTitle: {
    color: '#FFFEE0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  favValue: {
    color: 'white',
    fontSize: 15,
    marginTop: 10,
    paddingLeft: 5,
    fontStyle: 'italic',
  },
  
  card: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleBanner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(42, 10, 64, 0.85)',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  cardSceneTitle: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyText: {
    color: 'gray',
    marginTop: 10,
    fontStyle: 'italic',
  },
});