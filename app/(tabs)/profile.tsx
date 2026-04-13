import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const starWarsScenes = [
  { // tatooine
    id: 'sw1',
    title: 'Tatooine (A New Hope)',
    location: 'Death Valley, California',
    description: 'The iconic scenes of R2-D2 and C3-PO wandering the desert dunes were filmed right here.',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/5196dd82e4b0ef02d1bb4fef/1448845961723-PH11FTQE4H0CAQ7BTREV/star-wars-artoo-sand-dunes.jpg',
    coordinate: { latitude: 36.4614, longitude: -116.8656 },
  },
  { // great pit of carkoon
    id: 'sw2',
    title: 'The Great Pit of Carkoon (Return of the Jedi)',
    location: 'Brawley, California',
    description: 'Where the iconic Sarlacc pit battle from Return of the Jedi took place.',
    imageUrl: 'https://www.desertusa.com/sandhills/photos/5F3A9068_150422.jpg',
    coordinate: { latitude: 32.7667, longitude: -114.9333 },
  },
  { // ahch-to
    id: 'sw3', 
    title: 'Ahch-To (The Force Awakens)',
    location: 'County Kerry, Ireland',
    description: 'Luke Skywalker\'s isolated island retreat, this is the scene where Ray finds Luke Skywalker.',
    imageUrl: 'https://www.kevinandamanda.com/wp-content/uploads/2017/09/skellig-michael-star-wars-force-awakens-luke-island-02.jpg', 
    coordinate: { latitude: 51.7714, longitude: -10.5398 },
  }
]; // end starWarsScenes


const harryPotterScenes = [
  { // hogwarts grounds
    id: 'hp1',
    title: 'Hogwarts Grounds (Sorcerer\'s Stone, Chamber of Secrets)',
    location: 'Alnwick, United Kingdom',
    description: 'Known for its iconic exterior scenes of Hogwarts and where Madam Hooch\'s flying lessons were held.',
    imageUrl: 'https://people.com/thmb/0FByOEmF6zqGJZRtCHzy0EmDLCk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/Alnwick-Castle176-eb41b8c99f1d454c9d0626ed39ed1e13.jpg',
    coordinate: { latitude: 55.4156, longitude: -1.7059 },
  },
  { // kings cross
    id: 'hp2',
    title: 'King\'s Cross Station',
    location: 'London, United Kingdom',
    description: 'Where Harry runs through a brick wall into the wizarding world.',
    imageUrl: 'https://media.harrypotterfanzone.com/harry-and-ron-at-kings-cross-station.jpg',
    coordinate: { latitude: 51.5317, longitude: -0.1236 },
  },
  { // dobbys grave
    id: 'hp3',
    title: 'Dobby\'s Grave (Deathly Hallows - Part 1)',
    location: 'Castlemartin Pembrokeshire, West Wales',
    description: 'Burial site for Dobby the elf.',
    imageUrl: 'https://pembrokeshire-herald.com/wp-content/uploads/2019/04/dobbys-grave1.jpg',
    coordinate: { latitude: 51.6603, longitude: -5.0651 },
  }
]; // end harryPotterScenes


const notebookScenes = [
  { // cofc
    id: 'n1',
    title: 'Allie at School',
    location: 'Charleston, South Carolina',
    description: 'Location used for Allie attending Sarah Lawrence College.',
    imageUrl: 'https://storage.googleapis.com/moviemaps/img/4hm.ambo89.940.jpg',
    coordinate: { latitude: 32.7839, longitude: -79.9373 },
  },
  { // cypress gardens
    id: 'n2',
    title: 'Boat Scene',
    location: 'Moncks Corner, South Carolina',
    description: 'One of the more iconic scenes for the film, Allie and Noah\'s boat ride with the swans.',
    imageUrl: 'https://sev.h-cdn.co/assets/15/31/1600x680/gallery-1438120718-thenotebook1899.jpg',
    coordinate: { latitude: 33.0524, longitude: -79.9541 },
  },
  { // american theatre
    id: 'n3',
    title: 'Double Date',
    location: 'Charleston, South Carolina',
    description: 'Allie and Noah go on a movie double date in downtown Charleston.',
    imageUrl: 'https://i.pinimg.com/736x/b9/f0/03/b9f003a7587a93c648d4e9d02c9c72a2.jpg',
    coordinate: { latitude: 32.7923, longitude: -79.9388 },
  }
]; // end notebookScenes


const fastFuriousScenes = [
  { // shibuya crossing
    id: 'ff1',
    title: 'Street Racing in Shibuya (Tokyo Drift)',
    location: 'Shibuya, Tokyo, Japan',
    description: 'Iconic scene when Sean drifts his Mitsubishi Evo through a crowd in Shibuya Crossing.',
    imageUrl: 'https://www.sceen-it.com/Service/sceenit/sceen/medium/50977.jpg/nos/.jpg',
    coordinate: { latitude: 35.6596, longitude: 139.7006 }
  },
  { // toretto house
    id: 'ff2',
    title: 'Toretto\'s House',
    location: 'Los Angeles, California',
    description: 'Famously known house in the Fast & Furious franchise where gatherings between Dom and friends fequently occurred.',
    imageUrl: 'https://houseandhistory.com/wp-content/uploads/2023/07/Dominic-Toretto-House.jpg',
    coordinate: { latitude: 34.0690, longitude: -118.2516 }
  },
  { // templin highway
    id: 'ff3',
    title: 'Last Drive (Fast & Furious 7)',
    location: 'Castiac, California',
    description: 'The last scene shared between Brian and Dom before parting ways.',
    imageUrl: 'https://i.redd.it/v69pvxl9bga41.jpg',
    coordinate: { latitude: 34.6133, longitude: -118.6534 }
  }
]; // end fastFuriousScenes


const trumanShowScenes = [
  { // coleman beach
    id: 'ts1',
    title: 'Coleman Beach',
    location: 'Santa Rosa Beach, Florida',
    description: 'Entrance to the fictional town of Seahaven',
    imageUrl: 'https://photos.smugmug.com/September-2016/i-5pGQF4v/0/LNJJvNxQDMtSMJDZJ7G2DLm3ttbLv69vmD7pGZgTR/XL/IMG_9705-XL.jpg',
    coordinate: { latitude: 30.3198, longitude: -86.1387 }
  },
  { // modica market
    id: 'ts2',
    title: 'Modica Market',
    location: 'Santa Rosa Beach, Florida',
    description: 'Truman\'s local market where he woudl interact with neighbors.',
    imageUrl: 'https://www.30a.com/wp-content/uploads/2021/01/1Modica-Market-1.jpg',
    coordinate: { latitude: 30.3202, longitude: -86.1370 }
  },
  { // trumans house
    id: 'ts3',
    title: 'Truman\'s House',
    location: 'Santa Rosa Beach, Florida',
    description: 'Where Truman resided in Seahaven.',
    imageUrl: 'https://cdn.mos.cms.futurecdn.net/7f5fgrydqCbnwnYBiNJjmX.jpg',
    coordinate: { latitude: 30.3217, longitude: -86.1416 }
  },
]; // end trumanShowScenes


const lightningThiefScenes = [
  { // lotus hotel
    id: 'lt1',
    title: 'Lotus Hotel',
    location: 'Montreal, Québec, Canada',
    description: 'Exterior scenes filmed where Percy and friends were trapped inside a casino eating lotus flowers.',
    imageUrl: 'https://www.tvinsider.com/wp-content/uploads/2024/01/percy-jackson-lightning-thief-movie-lotus-casino-1014x570.jpg',
    coordinate: { latitude: 49.2929, longitude: -123.1293 }
  },
  { // camp half blood
    id: 'lt2',
    title: 'Camp Half-Blood',
    location: 'british Columbia, Canada',
    description: 'Percy\'s first step into the world of Olympians where he participates in Capture the Flag',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEim2CXhI2yHdIhBJZiHVZ_QUCQhrwLbEa6WH1824yIw2AT2IB7nuSzjnxJbeFrkrkQxym1d3DNKl7eK-leKRlTs77xUq4p2g-W_oksckbyyuTKEJ9vUZHfIy3jO3hYxq5MQjayQfa6PfGst5ylNI_YAwIt69xVjp3eIvpaOQjn-0BmkKBVpG_U1a96R3ly8/s1600/capture%20the%20flag.jpg',
    coordinate: { latitude: 49.3219, longitude: -122.4586 }
  },
  { // parthenon
    id: 'lt3',
    title: 'The Parthenon',
    location: 'Nashville, Tennessee',
    description: 'Fight scene in museum fighting off a fire-breathing Hydra.',
    imageUrl: 'https://www.fxguide.com/wp-content/uploads/2010/10/10Mar/thief/HY0050_v112.jpg',
    coordinate: { latitude: 36.1498, longitude: -86.8134 }
  }
]; // end lightningThiefScenes


export default function ProfileScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [favMovie, setFavMovie] = useState("");
  const [favShow, setFavShow] = useState("");

  // Saved Locations State
  const [favoriteScenes, setFavoriteScenes] = useState<any[]>([]);

  // AsyncStorage Logic
  useFocusEffect(
    useCallback(() => {
      loadSavedLocations();
    }, [])
  );

  const loadSavedLocations = async () => {
    try {
      const savedFavs = await AsyncStorage.getItem('userFavorites');
      if (savedFavs !== null) {
        const favoriteIds = JSON.parse(savedFavs);
        const allScenes = [
          ...starWarsScenes, 
          ...harryPotterScenes, 
          ...notebookScenes, 
          ...fastFuriousScenes, 
          ...trumanShowScenes, 
          ...lightningThiefScenes
        ];
        const matchingScenes = allScenes.filter(scene => favoriteIds.includes(scene.id));
        setFavoriteScenes(matchingScenes);
      }
    } catch (error) {
      console.error('Error loading favorites on profile:', error);
    }
  };

  return ( 
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.mainTitle}>My Profile</Text>
      </View>

      {/* Avatar with Edit Icon */}
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg' }}
        />
      </View>

      {/* The sections to edit the profile */}
      <Text style={styles.sectionTitle}>Edit Profile</Text>

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
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address"/>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Favorite Movie</Text>
        <TextInput style={styles.input} value={favMovie} onChangeText={setFavMovie} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Favorite Tv Show</Text>
        <TextInput style={styles.input} value={favShow} onChangeText={setFavShow} />
      </View>

      <Text style={styles.sectionTitle}>Saved Locations:</Text>
      
      {favoriteScenes.length === 0 ? (
        <Text style={styles.emptyText}>Tap the heart icon on scenes to save them here!</Text>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 15 }}
        >
          {favoriteScenes.map((loc) => (
            <TouchableOpacity 
              key={loc.id} 
              style={styles.card}
              onPress={() => router.push({
                pathname: '/(tabs)/map',
                params: { lat: loc.coordinate.latitude, lng: loc.coordinate.longitude }
              })}
            >
              <Image style={styles.image} source={{ uri: loc.imageUrl }}/>
              
              <View style={styles.titleBanner}>
                <Text style={styles.cardSceneTitle} numberOfLines={1}>{loc.title}</Text>
              </View>

            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F0A18', 
    paddingTop: 40 
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    marginBottom: 20 
  },
  mainTitle: { 
    color: '#d9a3fb', 
    fontSize: 32, 
    fontWeight: 'bold' 
  },
  avatarContainer: { 
    alignSelf: 'center', 
    marginBottom: 20, 
    position: 'relative' 
  },
  avatar: { 
    height: 110, 
    width: 110, 
    borderRadius: 55 
  },
  sectionTitle: { 
    color: '#d9a3fb', 
    fontSize: 22, 
    fontWeight: 'bold', 
    paddingLeft: 15, 
    marginTop: 10, 
    marginBottom: 15 
  },
  inputGroup: { 
    paddingHorizontal: 15, 
    marginBottom: 15 
  },
  label: { 
    color: 'white', 
    fontSize: 14, 
    marginBottom: 5 
  },
  input: { 
    backgroundColor: 'white',
    borderRadius: 8, 
    height: 45, 
    paddingHorizontal: 15, 
    fontSize: 16 
  },
  card: { 
    width: 120,
     height: 120, 
     borderRadius: 10, 
     marginRight: 15, 
     overflow: 'hidden' 
    },
  image: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
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
    textAlign: 'center'
  },
  emptyText: { 
    color: 'gray', 
    paddingHorizontal: 15, 
    fontStyle: 'italic' 
  }
});