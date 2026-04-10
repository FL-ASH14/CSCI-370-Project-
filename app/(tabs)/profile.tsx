import { View, Text, StyleSheet, Image } from 'react-native';

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

      <Text style={styles.headerText}>Favorite Movies</Text>
      <Text style={styles.headerText}>Favorite Shows</Text>
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
  }
});