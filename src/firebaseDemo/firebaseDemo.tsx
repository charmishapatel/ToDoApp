import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
  FlatList,
  Alert,
} from "react-native";

import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { StackActions } from "@react-navigation/native";

// Define the type for a todo item
interface TodoItem {
  list: string; 
  id: string;
}

function ToDo({navigation} : {navigation : any}): React.JSX.Element {
  // state
  const [inputTextValue, setInputTextValue] = useState<string>("");

  const [list, setList] = useState<TodoItem[]>([]);

  const [isUpdateData, setIsUpdateData] = useState(false);

  const [cardId, setCardId] = useState("");




  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      firestore().collection('todo').onSnapshot((snap) => {
        const tempArray: TodoItem[] = [];
        snap.forEach((item) => {
          const data = item.data();
          console.log(data); 
          // Check the data to confirm the structure
  
          // Ensure the 'list' field is being accessed and pushed correctly
          tempArray.push({
            list: data.list,  
            // Access the 'list' field from FireStore data
            id: item.id       
            // Add the FireStore document ID
          });
        });

        // Testing : console.log(tempArray);
        setList(tempArray);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  

  const handleAddData = async() => {
    try {
      if (inputTextValue.length > 0) {

        await firestore().collection('todo').add({
          list: inputTextValue
        });        
        setInputTextValue('')

      } else {
        Alert.alert('Please Enter Value & Then Try Again');
      }
    } catch{
      console.error(Error);
    }
  }

  


  const handleUpdateData = async () => {
    if (inputTextValue.length > 0 && cardId) {
      await firestore()
        .collection('todo')
        .doc(cardId)
        .update({
          list: inputTextValue
        });

      setInputTextValue(""); 
      setIsUpdateData(false); 
    } else {
      Alert.alert("Please enter a value and try again");
    }
  };
  

  const handleCardPress = (cardId : string, cardValue : string) => {
    try{
      setIsUpdateData(true);
      setCardId(cardId);
      setInputTextValue(cardValue);
    } catch(err){
      console.log(err);
    }
  };

  const handleCardLongPress = (cardId : string, cardValue : string) => {
    try {
      Alert.alert('Alert', `Are You Sure To Delete ${cardValue} ?`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Is Press');
          },
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              await firestore().collection('todo').doc(cardId).delete();
              setInputTextValue('');
              setIsUpdateData(false);
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  // function handleLogout() {
  //   async () => { 
  //     await Auth().signOut();
  //     navigation.navigate("Login");
  // }
  async function handleLogout() { 
    try {
      await Auth().signOut();
      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  
  
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />


      <View>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
          Todo App
        </Text>

        {/* Text Input */}
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Any Value"
          value={inputTextValue}
          onChangeText={setInputTextValue}
        />

        {!isUpdateData ? (
          <TouchableOpacity
           style={styles.addButton}
           onPress={() => handleAddData()}>
            <Text style={{ color: '#fff' }}>Add</Text>
          </TouchableOpacity>
          ) : (
          <TouchableOpacity
           style={styles.addButton}
           onPress={() => handleUpdateData()}
           >
            <Text style={{ color: '#fff' }}>Update</Text>
          </TouchableOpacity>
        )}

        {/* Logout button */}
        <TouchableOpacity
          style ={styles.logoutButton}
          onPress={handleLogout}>
          <Text  
           style={{ color: '#fff' }}>Log out</Text>
        </TouchableOpacity>
                  
      </View>

      {/* Displaying list */}

      <View style={styles.cardContainer}>
        <Text style={{ marginVertical: 20, fontSize: 20, fontWeight: 'bold' }}>
          Todo List
        </Text>

        {/* Use FlatList for efficient rendering */}
        <FlatList
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}

              onPress={() => handleCardPress(item.id, item.list)}

              onLongPress={() => handleCardLongPress(item.id ,item.list)}
            >
              {/* Only render the list if it's a valid string */}
              <Text>{typeof item.list === 'string' ? item.list : 'Invalid Data'}</Text>
            </TouchableOpacity>
          )}
        />

      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    marginVertical: 10,
  },
  cardContainer: {
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: width - 40,
    padding: 20,
    borderRadius: 30,
    marginVertical: 10,
  },
  logoutButton : {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    marginVertical: 10,
  }
});

export default ToDo;
