import React, {useState} from 'react';
import {
    View, 
    Text
} from 'react-native';


import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



// imports screens
import logIn from '../authentication/logInScreen';
import SignUp from '../authentication/signUpScreen';
import ToDo from '../firebaseDemo/firebaseDemo';
import SplashScreen from '../components/SplashScreen';

const Stack = createNativeStackNavigator();


function MainNavigator() {

    

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
        />

        <Stack.Screen
            name="Login"
            component={logIn}
            options={{headerShown: false}}
        />

        <Stack.Screen
            name="Signup"
            component={SignUp}
            options={{headerShown: false}}
        />     

        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;