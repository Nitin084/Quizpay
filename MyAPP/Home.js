import React from 'react';
import { SafeAreaView, Text, View,Button } from 'react-native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack'
// import {RootStackParamList} from './App'
// import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const Home=()=> {
  const navigation = useNavigation(); 

  const handlePress = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text style={{ fontSize: 50 }}>HOME PAGE</Text>
      <Button  title="Press" color="blue" onPress={handlePress}/>
    </View>
  );
}

export default Home; 