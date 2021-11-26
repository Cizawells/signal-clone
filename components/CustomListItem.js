import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({id, chatName, enterChat}) => {
    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            <Avatar 
            rounded
            source={{
                uri: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-grey-photo-placeholder-women-default-avatar-profile-icon-grey-photo-placeholder-illustrations-vectors-99724605.jpg"
            }}/>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle
                numberOfLines={1} ellipsizeMode="tail">
                    ABC
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
