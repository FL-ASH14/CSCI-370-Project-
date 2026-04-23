import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import { supabase } from '../supabase';

export default function LoginScreen() {

  // State to hold the user's typing
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    if (error) Alert.alert("Login Failed", error.message);
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Signup Failed", error.message);
    } else {
      Alert.alert("Your account has been created.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.logoText}>Film Finder</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="fan@filmfinder.com"
            placeholderTextColor="gray"
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter password"
            placeholderTextColor="gray"
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry // Hides the password
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleSignUp}>
          <Text style={styles.secondaryButtonText}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F0A18', 
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  formContainer: {
    backgroundColor: '#1f132e',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  logoText: { 
    color: '#FF69B4', 
    fontSize: 36, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 5
  },
  inputGroup: { 
    marginBottom: 20 
  },
  label: { 
    color: 'white', 
    fontSize: 14, 
    marginBottom: 8, 
    fontWeight: '500' 
  },
  input: { 
    backgroundColor: '#3e1260', 
    color: 'white', 
    borderRadius: 8, 
    height: 50, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#FF69B4' 
  },
  primaryButton: { 
    backgroundColor: '#FF69B4', 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15
  },
  primaryButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  secondaryButton: { 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d9a3fb'
  },
  secondaryButtonText: { 
    color: '#d9a3fb', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});