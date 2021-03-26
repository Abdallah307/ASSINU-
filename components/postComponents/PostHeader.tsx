import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'
import {useSelector} from 'react-redux'
import {Button, Icon} from 'react-native-elements'

const PostHeader = (props) => {

    const userId = useSelector(state=> {
        return state.auth.userId
    })


    return (
        <View style={styles.postHeader}>

            <View style={styles.info}>

                <ProfileAvatarImage
                    imageUrl={props.imageUrl}
                    style={styles.profileImage}
                />

                <View style={styles.postInfo}>
                    <Text style={styles.username}>{props.ownerName}</Text>
                    <Text style={styles.timestamp}>{new Date(props.createdAt).toDateString()}</Text>
                </View>
            {props.questionOwnerId === userId ? <Button
            onPress={()=> setIsBestAnswer(!isBestAnswer)}
            title='Mark as a best answer'
            /> : null}
            {props.bestAnswer ? <Icon
            name='check-circle'
            color='green'
            />: null}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    postHeader: {
        paddingHorizontal: 7,
        paddingVertical: 7,
        backgroundColor: 'white',
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10
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
        fontSize: 14,
        fontFamily:'OpenSans-Bold'
    },
    postInfo: {

    },
    timestamp: {
        fontSize: 12,
        color: 'grey',
        fontFamily:'OpenSans-Light'
    }
})

export default PostHeader;