import React, {useLayoutEffect, useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import {auth, db} from "../firebase"
import { updateProfile } from "firebase/auth";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons"
import { collection, query, where, onSnapshot } from "firebase/firestore";

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([])
    console.log(auth.currentUser.photoURL);
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }

    useEffect(() => {
        const q = query(collection(db, "chats"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const chats = [];
  querySnapshot.forEach((doc) => {
      chats.push({id: doc.id, data: doc.data()});
  });setChats(chats)
  console.log(chats);
});
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: {backgroundColor: "#fff"},
            headetTitleStyle: {color: "black"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
                </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                        <TouchableOpacity>
                            <AntDesign name="camerao" size={24} color="black"/>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
                            <SimpleLineIcons name="pencil" size={24} color="black"/>
                        </TouchableOpacity>
                </View>
            )
        })
        return () => {
            
        };
    }, [])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName
        })
    }
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data: {chatName}}) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})
