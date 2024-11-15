import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './axiosInstance';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOTP] = useState('');
  const navigation = useNavigation(); // Get the navigation object

  const handleSubmit = async () => {
    setShowOTPField(true);
    try {
      // Send a POST request to your backend server with the phone number
      const response = await axiosInstance.post('/send-otp', {
        PhoneNumber: PhoneNumber,
      });
    } catch (error) {
      console.error('Error sending request:', error);
    }
};

const handleOTPSubmit = async () => {
    try {
      const otpResponse = await axiosInstance.post('/verify-otp', {
        enteredOTP: otp,
        PhoneNumber: PhoneNumber,
      });

      if (otpResponse.status === 200) {
        // OTP is valid, now send the user data to the backend to save in the database
        const userResponse = await axiosInstance.post('/User', {
          username: username,
          PhoneNumber: PhoneNumber,
          password: password,
        });
  
        if (userResponse.status === 200) {
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('PhoneNumber', PhoneNumber);
          navigation.navigate('MonthlyQuiz');
        } else {
          alert('Error saving user data. Please try again.');
        }
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP submission:', error);
      alert('Error verifying OTP. Please try again.');
    }
  };

  return (
    <ImageBackground
    source={require('./BI-2.jpg')} // Replace 'path_to_your_image' with the actual path or require the image
    style={styles.container}
  >
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter UserName"
        onChangeText={(text) => setUsername(text)}
        required
      />
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {showOTPField && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            onChangeText={(text) => setOTP(text)}
            keyboardType="numeric"
            required
          />

          <TouchableOpacity style={styles.button} onPress={handleOTPSubmit}>
            <Text style={styles.buttonText}>Submit OTP</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Login 
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

export default SignupScreen;

