import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import HOST, { SERVER_PORT } from '../../configs/config'

const PostBody = (props: any) => {
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
                {props.imageUrl ? <Image
                    style={{width:'100%', aspectRatio: 4 / 3}}
                    source={{
                        uri: `http://${HOST}:${SERVER_PORT}/${props.imageUrl}`
                    }}
                />
                    : null
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    postBody: {
        backgroundColor: 'white',
        paddingVertical: 12,
        
    },
    postContent: {
        fontSize: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontFamily: 'OpenSans-Regular'
    }
})

export default PostBody;