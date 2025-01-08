import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';

//import database from '@react-native-firebase/database';

import auth from '@react-native-firebase/auth';

function LoginScreen({navigation} : {navigation : any}) : React.JSX.Element {

    // local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

 

  const handleLogin = async () => {
    try {
      if(email.length > 0 && password.length > 0) {
        const isUserLogin = await auth().signInWithEmailAndPassword(
            email,
            password,
          );
          setMessage('');
          console.log(isUserLogin);
    
          navigation.navigate('ToDo', 
            {
            email: isUserLogin.user.email,
            uid: isUserLogin.user.uid,
            });
        } else{
            Alert.alert("Please fill out all the required field")
        }

    } catch (err) {
      console.log(err);
      setMessage((err as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>

        {/* Heading */}
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Login
        </Text>

        {/*  Email field */}
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={value => setEmail(value)}
        />

        {/* password field */}
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Password"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />

        {/* login button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleLogin()}>
          <Text style={{color: '#fff'}}>Login</Text>
        </TouchableOpacity>

        <Text>{message}</Text>


        {/* Button to signup ? new user */}
        <TouchableOpacity
          style={styles.signup}
          onPress={() => {
            navigation.navigate("Signup");
          }}>
          <Text style={{color: 'blue'}}>create profile ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  signup: {
    alignItems: 'center',
  },
});

export default  LoginScreen;