import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import {Button, Input, Image} from "react-native-elements"
import { auth } from '../firebase'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";



const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageURL, setImageURL] = useState("");
    const register = () => {
        console.log("registering")
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: imageURL || "https://media.gq.com/photos/56bcb218cdf2db6945d2ef93/4:3/w_2000,h_1500,c_limit/bieber-coverstory-square.jpg"
          }).then(() => {
              console.log("profile updateddddd")
          })
          console.log(user)
          
          console.log(user)
          // ...
        })
        .catch((error) => {
            console.log("what")
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorCode)
          console.log(errorMessage)
        });
      
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={{marginBottom: 50}}>Create a Signal account</Text>

            <View style={styles.inputContainer}>
                <Input 
                placeholder="Full Name"
                autoFocus
                type="text"
                value={name}
                onChangeText={(text) => setName(text)}/>
                <Input 
                placeholder="Email"
                type="text"
                value={email}
                onChangeText={(text) => setEmail(text)}/>
                <Input 
                placeholder="Password"
                type="text"
                value={password}
                onChangeText={(text) => setPassword(text)}/>
                <Input 
                placeholder="Image url"
                type="text"
                value={imageURL}
                onChangeText={(text) => setImageURL(text)}
                onSubmitEditing={register}/>
            </View>

            <Button raised title="Register" onPress={register}/>

            <View style={{height: 100}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    Button: {
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        width: 300
    }
})
