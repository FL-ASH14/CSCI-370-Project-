import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const favMovies = [
  { id: 'm1', imageUrl: 'https://m.media-amazon.com/images/I/718OJKgQOcL._AC_SL1024_.jpg' },
  { id: 'm2', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTQ2NzUxMTAxN15BMl5BanBnXkFtZTcwMzEyMTIwMg@@._V1_FMjpg_UX1000_.jpg' },
  { id: 'm3', imageUrl: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg' },
  { id: 'm4', imageUrl: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/349/2024/10/30090026/t5v2Zsb5sa6PSP9jMUWY4GdIb3c-scaled.jpg' },
  { id: 'm5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg' }
] // end favMovies

const favShows = [
  { id: 's1', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_.jpg' },
  { id: 's2', imageUrl: 'https://mythicwall.com/cdn/shop/files/StrangerThings_1024x1024.jpg?v=1762444885' },
  { id: 's3', imageUrl: 'https://resizing.flixster.com/Lzq-nUwBS4DCJDOoSpOVTsCdJ5E=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vUlRUVjIwMTY1MC53ZWJw' },
  { id: 's4', imageUrl: 'https://static.wikia.nocookie.net/cbs/images/9/9e/Criminal_Minds_poster_%282%29.jpg/revision/latest?cb=20180524034753' }
] // end favShows

const savedLoc = [
  { id: 'l1', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjE0ZjgzMzYtMTAxYi00NGMzLThmZDktNzFlMzA2MWRmYWQ0XkEyXkFqcGc@._V1_.jpg' },
  { id: 'l2', imageUrl: 'https://m.media-amazon.com/images/I/91hz3I9r1hL.jpg' },
  { id: 'l3', imageUrl: 'https://m.media-amazon.com/images/I/71i6JuSZUGL.jpg' },
  { id: 'l4', imageUrl: 'https://m.media-amazon.com/images/I/610W-GQy4mL._AC_UF894,1000_QL80_.jpg' }
] // end svaedLoc


export default function Screen() {
  return ( 
    <ScrollView style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}>
      
      {/* user info */}
      <Text style={styles.userInfoText}>Jane Doe</Text>
      <Text style={styles.subUserText}>@janedoe</Text>
      <View style={styles.avatar}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg',
          }}
        />
      </View>

      {/* fav movies */}
      <View style={styles.section}>
        <Text style={styles.headerText}>Favorite Movies</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 15 }}
        >
          {favMovies.map((movie) => (
            <View key={movie.id} style={styles.card}>
              <Image style={styles.image} source={{ uri: movie.imageUrl }}/>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* fav shows */}
      <View style={styles.section}>
        <Text style={styles.headerText}>Favorite Shows</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 15 }}
        >
          {favShows.map((show) => (
            <View key={show.id} style={styles.card}>
              <Image style={styles.image} source={{ uri: show.imageUrl }}/>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* svaed locations */}
      <View style={styles.section}>
        <Text style={styles.headerText}>Saved Locations</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 15 }}
        >
          {savedLoc.map((loc) => (
            <View key={loc.id} style={styles.card}>
              <Image style={styles.image} source={{ uri: loc.imageUrl }}/>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  ); // end return
} // end screen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0A18', // A dark background similar to your Figma
    paddingTop: 10,
  },
  userInfoText: {
    color: '#FF69B4',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  subUserText: {
    color: '#a26a86',
    fontSize: 17,
    alignSelf: 'center'
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 10
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 5,
    alignSelf: 'center',
    marginBottom: 10
  },
  card: {
    width: 140,
    height: 200,
    borderRadius: 10,
    marginRight: 15,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  section: {
    marginBottom: 20,
  }
});