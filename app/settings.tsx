import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [favMovie, setFavMovie] = useState("");
  const [favShow, setFavShow] = useState("");

  // Load existing data when settings page opens so the form isn't blank
  useEffect(() => {
    const loadData = async () => {
      const storedProfile = await AsyncStorage.getItem('userProfile');
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setFirstName(profile.firstName || "");
        setLastName(profile.lastName || "");
        setUsername(profile.username || "");
        setEmail(profile.email || "");
        setFavMovie(profile.favMovie || "");
        setFavShow(profile.favShow || "");
      }
    };
    loadData();
  }, []);

  // Save the data to local storage so profile page can read it
  const handleSave = async () => {
    try {
      const profileData = { firstName, lastName, username, email, favMovie, favShow };
      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      
      console.log("Profile Saved!");
      router.back(); 
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return ( 
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg' }}
        />
        <Text style={styles.changePicText}>Change Profile Picture</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Favorite Movie</Text>
        <TextInput style={styles.input} value={favMovie} onChangeText={setFavMovie} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Favorite Tv Show</Text>
        <TextInput style={styles.input} value={favShow} onChangeText={setFavShow} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0A18',
    paddingTop: 20,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 30,
    alignItems: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePicText: {
    color: '#FF69B4',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputGroup: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1f132e',
    color: 'white',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3e1260',
  },
  saveButton: {
    backgroundColor: '#FF69B4',
    marginHorizontal: 20,
    marginTop: 20,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});