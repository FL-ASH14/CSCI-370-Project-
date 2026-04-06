import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';


const moviesData = [
  { // star wars
    id: '1',
    imageUrl: 'https://specials-images.forbesimg.com/imageserve/65f7875b62d7ee03f5c98b3f/960x0.jpg', 
  },
  { // harry potter
    id: '2',
    imageUrl: 'https://m.media-amazon.com/images/I/718OJKgQOcL._AC_SL1024_.jpg',
  },
  { // the notebook
    id: '3',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjE0ZjgzMzYtMTAxYi00NGMzLThmZDktNzFlMzA2MWRmYWQ0XkEyXkFqcGc@._V1_.jpg',
  },
  { // fast and furious
    id: '4',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_.jpg',
  },
  { // truman show
    id: '5',
    imageUrl: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/192/2023/08/15115111/vuza0WqY239yBXOadKlGwJsZJFE.jpg',
  },
  { // lightning thief
    id: '6',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZDE4M2ZiYzEtODJiZC00NmI1LWFlNTgtOGJlNTY3NmExYWNjXkEyXkFqcGc@._V1_.jpg',
  }
]; // end moviesData


export default function Home() {
  const router = useRouter();

  // go to scenes screen when movie is clicked
  const renderMovieCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.cardWrapper}
      onPress={() => router.push({
        pathname: '/scenes',
        params: { movie: item.id }
      })}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.posterImage}
      />
    </TouchableOpacity>
  ); // end renderMovieCard

  return (
    // layout view of movies 
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
  ); // end return
}; // end home


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