import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';

const moviesData = [
  {
    id: '1',
    // Star Wars poster
    imageUrl: 'https://specials-images.forbesimg.com/imageserve/65f7875b62d7ee03f5c98b3f/960x0.jpg', 
  }
];

export default function Home() {
  const router = useRouter();

  const renderMovieCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.cardWrapper}
      onPress={() => router.push('/scenes')}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.posterImage}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Trending Movies</Text>
      
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
  container: { 
    flex: 1, 
    backgroundColor: '#0F0A18', 
    paddingHorizontal: 15 
  },
  headerTitle: { 
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 25, 
    marginBottom: 20 
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