import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'

const CreatePostHeader = (props:any) => {
    return (
        <View style={styles.createPostHeader}>
            <ProfileAvatarImage style={styles.avatarImage} imageUrl={props.imageUrl} />
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
        fontFamily:'OpenSans-Bold'
    },
    avatarImage: {
        width:50,
        height:50,
        borderRadius:25
    }
})

export default CreatePostHeader;