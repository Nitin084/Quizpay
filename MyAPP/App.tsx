import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {Text, View,ImageBackground} from 'react-native';
import LoginScreen from "./LoginScreen";
import Questions from './QuestionsScreen';
import Header_footer from './header&footer';
import Header_Teacher from './headerTeacher';
import SignupScreen from "./SignupScreen";
import React from 'react';

export type RootStackParamList={
  Login: {ProductId: string}
  SignupScreen:{ProductId: string}
  MonthlyQuiz :{ProductId: string}
  Headerfooter :{ProductId: string}
  HeaderTeacher :{ProductId: string}
};

// const CustomHeader = () => (
//   <View style={{ backgroundColor: '#AED2FF', paddingTop: 20 }}>
//   </View>
// );
const CustomHeader = () => (
  <ImageBackground
    source={require('./BI-2.jpg')}
    // style={{ backgroundColor: '#AED2FF', paddingTop: 20 }}
  >
    {/* Your header content goes here */}
  </ImageBackground>
);

const CustomHeader1=()=>(
  <View style={{backgroundColor: 'black'}}></View>
)

const Stack = createNativeStackNavigator<RootStackParamList>()

function App():JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ header: CustomHeader }}>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='SignupScreen' component={SignupScreen}/>
        <Stack.Screen name="MonthlyQuiz"     component={Questions}  options={{ header: CustomHeader1 }}/>
        <Stack.Screen name="Headerfooter"    component={Header_footer} options={{ header: CustomHeader1 }}/>
        <Stack.Screen name="HeaderTeacher"   component={Header_Teacher} options={{ header: CustomHeader1 }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 