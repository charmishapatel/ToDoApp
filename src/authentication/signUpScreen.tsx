// This is a signup page 
// for new users to create profile

import React, 
{useEffect, useState} from 'react';

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

import firestore from '@react-native-firebase/firestore';

function SignUp({navigation} : {navigation : any}) : React.JSX.Element {

    // local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState("");

  const [message, setMessage] = useState('');

  // handling signup button
  const handleSignup = async () => {
    try {
      if(email.length > 0 && password.length > 0 && name.length > 0) {
        const response = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );

          const userData = {
            id : response.user.uid,
            name : name,
            email : email,
          }

          await firestore().collection('users').doc(response.user.uid).set({userData});

          setMessage('');
          // console.log(isUserCreated);
          navigation.navigate("Login");
        } else {
            Alert.alert("Please fill out all required data")
        }
    } catch (err ) {
      console.log(err);
      setMessage((err as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>

        {/* App Name */}
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Metahub
        </Text>

        {/* Name */}
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Name"
          value={name}
          onChangeText={value => setName(value)}
        />

        {/* Email */}
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={value => setEmail(value)}
        />


        {/* Password */}
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
          onPress={() => handleSignup()}>
          <Text style={{color: '#fff'}}>SignUp</Text>
        </TouchableOpacity>


        {/* Existing user */}
        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate("Login")}>
          <Text style={{color: 'blue'}}>Existing user?</Text>
        </TouchableOpacity>

        <Text>{message}</Text>
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
  login: {
    alignItems: 'center',
    marginTop: 10,
    //fontSize: 20,
  },
});

export default SignUp;