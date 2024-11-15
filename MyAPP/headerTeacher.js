import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header_Teacher = () => {
  const navigation = useNavigation();

  const handleMTClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AddNewTopics' }],
    });
  };

  const handleSAClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'StudentAnalysis' }],
    });
  };

  const handleTPClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'TeacherProfile' }],
    });
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={handleMTClick}>
        <Text style={styles.buttonText}>Select Topics</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSAClick}>
        <Text style={styles.buttonText}>Student Analysis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleTPClick}>
        <Text style={styles.buttonText}>Teacher Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Header_Teacher;
