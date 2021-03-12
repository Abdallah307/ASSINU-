import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'

const CreatePostHeader = (props:any) => {
    return (
        <View style={styles.createPostHeader}>
            <ProfileAvatarImage imageUrl={props.imageUrl} />
            <Text style={styles.username}>{props.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    createPostHeader: {
        flexDirection:'row',
        alignItems:'center',
        padding:15
    },
    username: {
        color:'black',
        fontSize:16,
        fontWeight:'bold'
    }
})

export default CreatePostHeader;