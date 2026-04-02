import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRouter, useLocalSearchParams } from 'expo-router';

const movieLocations = [
  { id: '1', 
    title: 'Tatooine (Death Valley)', 
    coordinate: { latitude: 36.4614, longitude: -116.8656 } 
  },
  { id: '2', 
    title: 'The Great Pit (Buttercup Dunes)', 
    coordinate: { latitude: 32.7667, longitude: -114.9333 } 
  },
  { id: '3', 
    title: 'Ahch-To (Skellig Michael)', 
    coordinate: { latitude: 51.7714, longitude: -10.5398 } 
  },
  // Harry Potter location
  //{ id: 'hp1', 
  // title: 'Horcrux Cave (Moher Cliffs)', 
  // coordinate: { latitude: 52.9720, longitude: -9.4265 } 
  // },
];

export default function MapScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  
  
  const params = useLocalSearchParams();
  const { lat, lng } = params;

  
  const zoomToLocation = (latitude: number, longitude: number) => {
    mapRef.current?.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.1, 
      longitudeDelta: 0.1,
    });
  };

  const resetMap = () => {
    mapRef.current?.animateToRegion({
      latitude: 39.8283, longitude: -98.5795, latitudeDelta: 40.0, longitudeDelta: 40.0,
    });
  };
 
  // If coordinates exist in the URL, convert them from text to numbers and zooms in the location
  useEffect(() => {
    if (lat && lng) {
      zoomToLocation(parseFloat(lat as string), parseFloat(lng as string));
    }
  }, [lat, lng]);

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 39.8283, longitude: -98.5795, latitudeDelta: 40.0, longitudeDelta: 40.0,
        }}
        userInterfaceStyle="dark" 
      >
        {movieLocations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={loc.coordinate}
            pinColor="#FF69B4"
          >
            <Callout tooltip={true} onPress={() => router.push('/scenes')}>
              <View style={styles.customCallout}>
                <Text style={styles.calloutTitle}>{loc.title}</Text>
                <Text style={styles.calloutClick}>Tap to view all scenes ➔</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.buttonOverlay}>
        <TouchableOpacity style={styles.actionButton} onPress={resetMap}>
          <Text style={styles.buttonText}>Reset Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  map: { 
    width: '100%', 
    height: '100%' 
  },
  customCallout: { 
    backgroundColor: '#3e1260', 
    padding: 12, 
    borderRadius: 10, 
    width: 180, 
    alignItems: 'center' 
  },
  calloutTitle: { 
    fontWeight: 'bold', 
    fontSize: 14, 
    color: 'white', 
    marginBottom: 5, 
    textAlign: 'center' 
  },
  calloutClick: { 
    fontSize: 11, 
    color: '#FF69B4', 
    fontWeight: 'bold' 
  },
  buttonOverlay: { 
    position: 'absolute', 
    bottom: 30, 
    alignSelf: 'center' 
  },
  actionButton: { 
    backgroundColor: '#3e1260', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: '#FF69B4' 
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold' 
  }
});