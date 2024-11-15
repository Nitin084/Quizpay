import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header_footer = () => {
  const navigation = useNavigation();

  const handleQAClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MonthlyQuiz' }],
    });
  };

  const handleRQAClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ResolveIssues' }],
    });
  };

  const handleSPClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'StudentProfile' }],
    });
  };

  const handleSDClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'StudentDetails' }],
    });
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={handleQAClick}>
        <Text style={styles.buttonText}>Q&A</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRQAClick}>
        <Text style={styles.buttonText}>RQ&A</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSPClick}>
        <Text style={styles.buttonText}>SP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSDClick}>
        <Text style={styles.buttonText}>SD</Text>
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

export default Header_footer;
