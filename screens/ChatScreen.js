import React, {useLayoutEffect, useState} from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase'
import { doc, updateDoc, serverTimestamp, collection } from "firebase/firestore";

const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState("")
    useLayoutEffect(() => {
      navigation.setOptions({
          title: "Chat",
          headerBackTitleVisible: false,
          headerTitleAlign: "left",
          headerTitle: () => (
              <View style={{
                  flexDirection: "row",
                  alignItems: "center"
              }}>
                    <Avatar 
                    rounded
                    source={{
                        uri: "https://media.gq.com/photos/56bcb218cdf2db6945d2ef93/4:3/w_2000,h_1500,c_limit/bieber-coverstory-square.jpg"
                    }}/>
                    <Text style={{color: "white", marginLeft: 10, fontWeight: "700"}}>{route.params.chatName}</Text>
              </View>
          ),
          headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack}>
                  <AntDesign name="arrowleft" size={24} color="white"/>
              </TouchableOpacity>
          ),
          headerRight: () => (
              <View
              style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 80,
                  marginRight: 20
              }}>
            <TouchableOpacity onPress={navigation.goBack}>
                <FontAwesome name="video-camera" size={24} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigation.goBack}>
                <Ionicons name="call" size={24} color="white"/>
            </TouchableOpacity>
            </View>
        )

      })
    }, [])

     const sendMessage = async () => {
        Keyboard.dismiss();

        // const chatRef = doc(db, "chats", "messages", route.params.id);
        const collectionRef = collection(db, "chats", "messages")

        
        await addDoc(collectionRef, {
            timestamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput("")

        
// Set the "capital" field of the city 'DC'
await updateDoc(chatRef, {
    capital: true
  });
        
     }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding' : "height"} style={styles.container} keyboardVerticalOffset={90}>
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
                <>
            
            <ScrollView>
                {/*Chats goes here*/}
            </ScrollView>
            <View style={styles.footer}>
                <TextInput 
                onChangeText={(text) => setInput(text)}
                value={input}
                 placeholder="Signal Message" 
                 style={styles.TextInput}/>
                 <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Ionicons name="send" size={24} color="#2B68E6"/>
                 </TouchableOpacity>
            </View>
            </>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    TextInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparenet",
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
})
