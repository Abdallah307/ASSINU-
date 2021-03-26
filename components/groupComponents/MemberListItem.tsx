import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'


const MemberListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <ProfileAvatarImage 
            style={styles.userImage} 
            imageUrl={props.imageUrl}
            />
            <Text>{props.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection:'row'
    },
    userImage : {
        width:50,
        height:50,
        borderRadius:25
    }
})

export default MemberListItem
