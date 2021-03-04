import React from 'react'
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native'

const PostBody = (props) => {
    return (
        <TouchableNativeFeedback  
        onPress={props.onOpenPost}
        >
            <View style={styles.postBody}>
                <Text 
                numberOfLines={5}
                style={styles.postContent}>{props.content}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    postBody: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 15
    },
    postContent: {
        fontSize: 15,
        paddingVertical: 5
    }
})

export default PostBody;