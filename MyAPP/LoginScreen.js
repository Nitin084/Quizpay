import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './axiosInstance';


const LoginScreen = () => {
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Get the navigation object

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/loginUser', { PhoneNumber, password });
      const data = response.data;
       if (response.status === 200) {
          await AsyncStorage.setItem('PhoneNumber', PhoneNumber);
          navigation.navigate('MonthlyQuiz'); // Navigate to the teacher screen
      } else {
        // Handle login error
        console.error(data.message);
      }
    } catch (error) {
      console.error('', error.message);
    }
  };

  return (
    <ImageBackground
    source={require('./BI-2.jpg')} // Replace 'path_to_your_image' with the actual path or require the image
    style={styles.container}
  >
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter PhoneNumber"
        onChangeText={(text) => setPhoneNumber(text)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Password" 
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        required
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('ForgetPasswordScreen')}>
        Forget password?
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate('SignupScreen')}>
        Sign up
      </Text>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#AED2FF',
  },
  title: {
    fontSize: 50,
    marginBottom: 20,
    color: 'black'
  },
  input: {
    height: 40,
    width: 300,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'white',
    color: 'black'
  },
  button: {
    height: 40,
    width: 300,
    backgroundColor: '#24a0ed',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  link: {
    color: 'blue',
    fontSize: 20,
    marginBottom: 15,
  },
});

export default LoginScreen;

