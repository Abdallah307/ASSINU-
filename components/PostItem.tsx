import React, {useState} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import {useSelector} from 'react-redux'

const PostItem = (props) => {

    
    return (
        
            <View style={styles.postItem}>
                <PostHeader />
                <PostBody postId={props.postId} onOpenPost={props.onOpenPost} content={props.content} />
                <PostFooter onOpenPost={props.onOpenPost} />
            </View>
       
    )
}

const styles = StyleSheet.create({
    postItem: {
        marginVertical: 3
    }
})

export default PostItem;