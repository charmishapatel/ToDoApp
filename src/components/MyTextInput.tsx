// creating custom text input field and using useState hook to keep track of user input

import React from "react";
import{
    View,
    Text,
    StyleSheet,
    TextInput,
} from "react-native";
import {useState} from "react";
//accept placeholder text and isPassword boolean as props in this component.
type MyTextInputprops ={
    placeholder:  string,
    isPassword: boolean,
}

function MyTextInput(props : MyTextInputprops) : React.JSX.Element{
    //accessing the value
    const placeholder = props.placeholder
    const isPassword = props.isPassword
    //component started with empty string, input value is use as value, as soon as user start typing anything handleChangeText is called, this method receives a parameter, whatever text user has entered will be passed as a parameter, we are setting that value to the state variable and ultimately that value is displayed.
    const [inputVal, setInputVal] = useState("");

    //     This function is triggered every time the user types into the text input field. It takes the new text (newTxt) as a parameter.
    // setInputVal(newTxt) updates the state (inputVal) with the text that the user has entered.
    // console.log prints the changed text to the console for debugging purposes.


    //in React Native, the onChangeText prop of the TextInput component is predefined to accept a single parameter, which is the new value that the user types into the input field. This design is part of how React Native manages form inputs and user interactions
    function handleChangeText(newTxt: string){
        console.log(`Text Changed: ${newTxt}`);
        setInputVal(newTxt);
        //updating the state of the component
        // The setInputVal(newTxt) call updates the inputVal state with the new text entered by the user.
    }
    return(
        <View>
            {/* //value(actual value) and placeholder,  */}
            {/* for every key press the onChange is executed */}
            <TextInput placeholder="Input Text" value={inputVal}
            secureTextEntry={false} style= {style.inputBox} onChangeText={handleChangeText}/>
            
        </View>
    );
}

const style = StyleSheet.create({
    inputBox: {
        width: 250,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: "#fff",
        marginVertical: 20,
        fontSize: 20,
        fontWeight: '600',
        padding: 10,
    }
});

export default MyTextInput;