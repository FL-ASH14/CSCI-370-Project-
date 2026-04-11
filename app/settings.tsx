import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native';
import React, { useState } from 'react';


export default function Settings() {
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg',
          }}/>
      </View>
      
      <Pressable onPress={() => console.log("Change Profile Picture")}>
        <Text style={styles.editPic}>Change Profile Picture</Text>
      </Pressable>

      {/* text box and user input*/}
      <View>
        <Text style={styles.headerText}>Change Username</Text>
      </View>

      <View style={styles.textBox}>
        <TextInput
          value={username}
          placeholder="New Username"
          onChangeText={setUsername}
          style={styles.input}
        />
      </View>    

        {/* save button */}
        <Pressable
          onPress={() => console.log(username)}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}>
            <Text style={styles.buttonText}>Save</Text>
        </Pressable>
    </View>
  ); // end return
}; // end settings


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0A18'
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 5,
    alignSelf: 'center',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    borderRadius: 10,
    width: 150,
    alignSelf: 'center',
    marginTop: 100
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }]
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center'
  },
  subText: {
    color: '#ffffff',
    fontSize: 17,
    alignSelf: 'center'
  },
  textBox: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  editPic: {
    color: '#a26a86',
    fontSize: 15,
    alignSelf: 'center'
  },
  input: {
    marginLeft: 15
  },
  headerText: {
    color: '#ffffff',
    fontSize: 17,
    marginLeft: 15,
    marginTop: 50
  }
});