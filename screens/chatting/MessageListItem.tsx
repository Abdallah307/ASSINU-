import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import ProfileAvatarImage from '../../components/profileComponents/ProfileAvatarImage'

const MessagesListItem = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.openChat}>
            <View style={styles.listItem}>
                <ProfileAvatarImage
                    imageUrl={props.imageUrl}
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.username}>{props.name}</Text>
                    <Text style={{maxWidth:'100%'}}  numberOfLines={1} ellipsizeMode='tail'>{props.lastMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MessagesListItem

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
        padding: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    username: {
        fontFamily:'OpenSans-Bold',
        fontSize:16
    }
})