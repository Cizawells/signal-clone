 import React, {useEffect, useState} from 'react'
 import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
 import {Button, Input, Image} from "react-native-elements"
 import { StatusBar } from 'expo-status-bar'
 import {auth} from "../firebase"
 import { onAuthStateChanged } from "firebase/auth";
 import {  signInWithEmailAndPassword } from "firebase/auth";
 
 const LoginScreen = ({navigation}) => {
     const[email, setEmail] = useState("");
     const[password, setPassword] = useState("");

     useEffect(() => {
       const unsubscribe =  onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              
              navigation.replace("Home")
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
         return unsubscribe
     }, [])
     const signIn = () => {
       console.log("signing in user")
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          if(user) {
            console.log("user exists")
              navigation.replace("Home")
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage)
        });
      
     }
     return (
         <KeyboardAvoidingView behavior="padding" style={styles.container}>
             <StatusBar style="light" />
             <Image 
             source={{
                 uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
             }}
             style={{ width: 200, height: 200}}
             />
             <View style={styles.inputContainer}>
                    <Input placeholder="Email" autoFocus type="email" onChangeText={(text) => setEmail(text)}/>
                    <Input placeholder="Password"  type="password" secureTextEntry onChangeText={(text) => setPassword(text)}/>
             </View>
             <Button containerStyle={styles.button} title="Login" onPress={signIn}/>
             <Button containerStyle={styles.button} title="Register" type="outline" onPress={() => navigation.navigate("Signup")}/>
         </KeyboardAvoidingView>
     )
 }
 
 export default LoginScreen
 
 const styles = StyleSheet.create({
     container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
     },
     inputContainer: {
            width: 300
     },
     button: {
            width: 200,
            marginTop: 10
     }
 })
 