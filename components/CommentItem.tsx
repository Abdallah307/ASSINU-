import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Button } from 'react-native-elements'
import ProfileAvatarImage from './ProfileAvatarImage'

const CommentItem = (props: any) => {
    return (

        <View style={styles.commentView}>
            <ProfileAvatarImage imageUrl={props.imageUrl} style={styles.commentImage} />
            <View style={styles.commentBody}>
                <View style={styles.texts}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.info}>Computer Engineer</Text>
                    <Text style={styles.info}>5h</Text>
                </View>
                <View style={styles.commentContentView}>
                    <Text style={styles.commentText}>{props.content}</Text>
                </View>
                {props.children}
            </View>
        </View>



    )
}

const styles = StyleSheet.create({

    commentView: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        paddingHorizontal:5
    },
    texts: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    commentBody: {
        backgroundColor: '#eee',
        width: '80%',
        borderRadius: 15,
        paddingHorizontal: 5,
        borderTopLeftRadius: 0
    },
    commentContentView: {
        padding: 10
    },
    commentText: {
        fontSize: 13,
    },
    commentImage: {
        width:40,
        height:40,
        borderRadius:20
    },
    info: {
        color:'grey',
    }

})

export default CommentItem;