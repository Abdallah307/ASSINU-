import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'
import CommentBodyContent from './CommentBodyContent'
import CommentBodyHeader from './CommentBodyHeader'

const CommentItem = (props: any) => {
    return (

        <View style={styles.commentView}>

            <ProfileAvatarImage
                imageUrl={props.imageUrl}
                style={styles.commentImage}
            />

            <View style={styles.commentBody}>

                <CommentBodyHeader
                    name={props.name}
                    createdAt={props.createdAt}
                />

                <CommentBodyContent
                    content={props.content}
                />
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
        paddingHorizontal: 5
    },
    name: {
        fontSize: 16,
        fontFamily:'OpenSans-Regular'
    },
    commentBody: {
        backgroundColor: '#eee',
        width: '80%',
        borderRadius: 15,
        paddingHorizontal: 5,
        borderTopLeftRadius: 0
    },

    commentImage: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    info: {
        color: 'grey',
    }

})

export default CommentItem;