import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'

const PostHeader = (props) => {
    return (
        <View style={styles.postHeader}>

            <View style={styles.info}>

                <ProfileAvatarImage
                    imageUrl={props.imageUrl}
                    style={styles.profileImage}
                />

                <View style={styles.postInfo}>
                    <Text style={styles.username}>{props.ownerName}</Text>
                    <Text style={styles.timestamp}>5h</Text>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    postHeader: {
        paddingHorizontal: 7,
        paddingVertical: 7,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 17.5
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postInfo: {

    },
    timestamp: {
        fontSize: 12,
        color: 'grey'
    }
})

export default PostHeader;