import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ProfileAvatarImage from './ProfileAvatarImage'

const CreatePostHeader = (props) => {
    return (
        <View style={styles.createPostHeader}>
            <ProfileAvatarImage />
            <Text style={styles.username}>Abdallah Dereia</Text>
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