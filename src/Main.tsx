import react from "react";
import { useState } from "react";
import {
View,
Text,
StyleSheet,
Button,
} from "react-native";
import MyTextInput from "./components/MyTextInput";
import  BouncyCheckbox from "react-native-bouncy-checkbox";

//whenever the value updates the UI updates.

function Main() : React.JSX.Element{
    //The console.log("Main component UI refreshed"); line is inside the body of the Main function, so every time the component(setCounter) re-renders, the entire function is executed from the top, including the console.log statement.
    console.log("Main component UI refreshed");
    //useState hook from react.
    //useState method returns an Array.
    //const [stateVariable, updateStateMethod] = useState(initial)

    const [counter, setCounter] = useState(0);

    function handlePress(){
        const newCounterValue = counter == 4 ? counter : counter + 1;
        //ternary operator
        //if the counter = 4, then return counter (it will not increase)
        //else update the counter by 1

        setCounter(newCounterValue);
    }
    
    return(
        <View style={style.mainScreen}>
            <Text style={style.txt}>useState Demo</Text>
            <Text style={style.txt}>{counter}</Text>
            <Button onPress={handlePress}title="Increment"/>
            <MyTextInput placeholder="userName" isPassword={false}/>
            <MyTextInput placeholder="Password" isPassword={true}/>
            <View style={style.Tnc}>
            <BouncyCheckbox
                size={25}
                fillColor="green"
                unFillColor="#FFFFFF"
                // text="Custom Checkbox"
                // iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                onPress={(isChecked: boolean) => {console.log(isChecked)}} />
                <Text>Terms and Conditions</Text>
            </View>
            
        </View>
    )
}

const style = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor : "#FFCFB3",
        alignItems: 'center',
        justifyContent: 'center', 
    },

    txt: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 20,
    },

    btn: {
        padding: 5,
    },

    Tnc: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    }
});
export default Main;