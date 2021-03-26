import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const CommentBodyContent = props => {
    return (
        <View style={styles.commentContentView}>
            <Text style={styles.commentText}>{props.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    commentContentView: {
        padding: 10
    },
    commentText: {
        fontSize: 13,
        fontFamily:'OpenSans-Regular'
    },
})

export default CommentBodyContent