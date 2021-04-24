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
                    <Text>{props.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MessagesListItem

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        backgroundColor: 'red',
        marginVertical: 10,
        alignItems: 'center',
        padding: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    }
})