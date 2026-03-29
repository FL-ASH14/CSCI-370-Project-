import { View, Text, StyleSheet } from 'react-native';

export default function Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trending Movie Locations</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0A18', // A dark background similar to your Figma
  },
  text: {
    flex: 1,
    color: '#d9a3fb',
    fontSize: 23,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    right: 40,
    padding: 20,
  },
});