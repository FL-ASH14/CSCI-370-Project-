import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


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


export default function ScenesScreen() {
  const router = useRouter();
  const { movie } = useLocalSearchParams();
  

  //Setup placeholder variables
  let displayData = starWarsScenes;
  let displayTitle = 'Star Wars Locations';

  //if/else logic to match the ID from index.tsx to the right array
  if (movie === '1') 
    {
    displayData = starWarsScenes;
    displayTitle = 'Star Wars Locations';
  } 
  else if (movie === '2') {
    displayData = harryPotterScenes;
    displayTitle = 'Harry Potter Locations';
  } 
  else if (movie === '3') {
    displayData = notebookScenes;
    displayTitle = 'The Notebook Locations';
  } 
  else if (movie === '4') {
    displayData = fastFuriousScenes;
    displayTitle = 'Fast & Furious Locations';
  } 
  else if (movie === '5') {
    displayData = trumanShowScenes;
    displayTitle = 'The Truman Show Locations';
  } 
  else if (movie === '6') {
    displayData = lightningThiefScenes;
    displayTitle = 'Percy Jackson Locations';
  }

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
        <View style={styles.textColumn}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardLocation}>{item.location}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{displayTitle}</Text>
      
      <FlatList
        data={displayData}
        keyExtractor={(item) => item.id}
        renderItem={renderSceneCard}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

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
    padding: 15, 
    backgroundColor: '#2a0a40', 
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15 
  },
  textColumn: {
    flex: 1,
    paddingRight: 10
  },
  heartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10
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