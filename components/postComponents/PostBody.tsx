import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const PostBody = (props:any) => {
    return (
        <TouchableOpacity
        activeOpacity={0.7}  
        onPress={props.onOpenPost}
        >
            <View style={styles.postBody}>
                <Text 
                numberOfLines={5}
                style={styles.postContent}>{props.content}
                </Text>
            </View>
        </TouchableOpacity>
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