import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRouter, useLocalSearchParams } from 'expo-router';


const movieLocations = [
  // star wars locations (Movie ID: '1')
  { id: 'sw1', 
    movieId: '1', 
    title: 'Death Valley', 
    coordinate: { latitude: 36.4614, longitude: -116.8656 } 
  },
  { id: 'sw2', 
    movieId: '1', 
    title: 'Buttercup Dunes', 
    coordinate: { latitude: 32.7667, longitude: -114.9333 } 
  },
  { id: 'sw3',
    movieId: '1', 
    title: 'Skellig Islands', 
    coordinate: { latitude: 51.7714, longitude: -10.5398 } 
  },

  // harry potter locations (Movie ID: '2')
  { id: 'hp1', 
    movieId: '2', 
    title: 'Alnwick Castle', 
    coordinate: { latitude: 55.4156, longitude: -1.7059 }
   },
  { id: 'hp2', 
    movieId: '2', 
    title: 'King\'s Cross Station', 
    coordinate: { latitude: 51.5317, longitude: -0.1236 } 
  },
  { id: 'hp3', 
    movieId: '2', 
    title: 'Freshwater West', 
    coordinate: { latitude: 51.6603, longitude: -5.0651 } 
  },

  // the notebook locations (Movie ID: '3')
  { id: 'n1', 
    movieId: '3', 
    title: 'College of Charleston', 
    coordinate: { latitude: 32.7839, longitude: -79.9373 } 
  },
  { id: 'n2', 
    movieId: '3', 
    title: 'Cypress Gardens', 
    coordinate: { latitude: 33.0524, longitude: -79.9541 } 
  },
  { id: 'n3', 
    movieId: '3', 
    title: 'American Theater', 
    coordinate: { latitude: 32.7923, longitude: -79.9388 } 
  },

  // fast and furious (Movie ID: '4')
  { id: 'ff1', 
    movieId: '4', 
    title: 'Shibuya Crossing', 
    coordinate: { latitude: 35.6596, longitude: 139.7006 }
   },
  { id: 'ff2', 
    movieId: '4', 
    title: '724 E Kensington Rd', 
    coordinate: { latitude: 34.0690, longitude: -118.2516 } 
  },
  { id: 'ff3', 
    movieId: '4', 
    title: 'Templin Highway/Ridge Route Road', 
    coordinate: { latitude: 34.6133, longitude: -118.6534 } 
  },

  // truman show (Movie ID: '5')
  { id: 'ts1', 
    movieId: '5', 
    title: 'Coleman Beach', 
    coordinate: { latitude: 30.3198, longitude: -86.1387 } 
  },
  { id: 'ts2', 
    movieId: '5', 
    title: 'Modica Market', 
    coordinate: { latitude: 30.3202, longitude: -86.1370 } 
  },
  { id: 'ts3', 
    movieId: '5', 
    title: '31 Natchez St.', 
    coordinate: { latitude: 30.3217, longitude: -86.1416 } 
  },
  
  // lightning thief (Movie ID: '6')
  { id: 'lt1', 
    movieId: '6',
     title: 'Le Westin Hotel', 
     coordinate: { latitude: 49.2929, longitude: -123.1293 } 
    },
  { id: 'lt2', 
    movieId: '6', 
    title: 'Alouette Lake', 
    coordinate: { latitude: 49.3219, longitude: -122.4586 } 
  },
  { id: 'lt3', 
    movieId: '6', 
    title: 'Nashville Centennial Park, The Parthenon', 
    coordinate: { latitude: 36.1498, longitude: -86.8134 } 
  },
]; // end movieLocations


export default function MapScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  
  const params = useLocalSearchParams();
  const { lat, lng } = params;

  // zoom in to location
  const zoomToLocation = (latitude: number, longitude: number) => {
    mapRef.current?.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.1, 
      longitudeDelta: 0.1,
    });
  }; // end zoomToLocation

  // zoom out to whole map 
  const resetMap = () => {
    mapRef.current?.animateToRegion({
      latitude: 39.8283, longitude: -98.5795, latitudeDelta: 40.0, longitudeDelta: 40.0,
    });
  }; // end resetMap
 
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
            <Callout tooltip={true} onPress={() => router.push({
              pathname: '/scenes',
              params: { movie: loc.movieId } 
            })}>
              <View style={styles.customCallout}>
                <Text style={styles.calloutTitle}>{loc.title}</Text>
                <Text style={styles.calloutClick}>Tap to view all scenes</Text>
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
  ); // end return 
}; // end MapScreen


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