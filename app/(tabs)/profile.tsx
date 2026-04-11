import { View, Text, StyleSheet, Image, ScrollView} from 'react-native';

const favShows = [
  { id: 'f1', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_.jpg' },
  { id: 'f2', imageUrl: 'https://mythicwall.com/cdn/shop/files/StrangerThings_1024x1024.jpg?v=1762444885' },
  { id: 'f3', imageUrl: 'https://resizing.flixster.com/Lzq-nUwBS4DCJDOoSpOVTsCdJ5E=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vUlRUVjIwMTY1MC53ZWJw' }
]

export default function Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.userText}>Jane Doe</Text>
      <Text style={styles.subUserText}>@janedoe</Text>
      <View style={styles.avatar}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg',
          }}
        />
      </View>

      // fav movies
      <Text style={styles.headerText}>Favorite Movies</Text>
      

      // fav shows
      <Text style={styles.headerText}>Favorite Shows</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favShows.map((show) => (
          <View key={show.id} style={styles.card}>
            <Image style={styles.image} source={{ uri: show.imageUrl }}/>
          </View>
        ))}
      </ScrollView>

      // saved locations
      <Text style={styles.headerText}>Saved Locations</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0F0A18', // A dark background similar to your Figma
    paddingTop: 15,
  },
  userText: {
    color: '#FF69B4',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subUserText: {
    color: '#a26a86',
    fontSize: 17,
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-start',
    paddingLeft: 20,
    padding: 30,
    marginBottom: 90
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 5,
  },
  card: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: '100%'
  }
});