import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import HOST, { SERVER_PORT } from '../../configs/config'
import axios from 'axios'

const PostItem = (props) => {

    const openImage = () => {
        props.navigation.navigate('FullImageScreen', {
            imageUrl: props.imageUrl
        })
    }

    const openPost = () => {
        let imageUrl;
        try { imageUrl = props.post.imageUrl } catch (err) { imageUrl = null }
        props.navigation.navigate('FullPost', {
            groupId: props.post.groupId,
            post: props.post,
            imageUrl: imageUrl,
        })
    }

    return (

        <View style={styles.postItem}>

            <PostHeader
                onPostHeaderPressed={props.onPostHeaderPressed}
                createdAt={props.post.createdAt}
                ownerName={props.post.ownerId.name}
                imageUrl={props.post.ownerId.imageUrl}
            />

            <PostBody
                openImage={openImage}
                imageUrl={props.imageUrl}
                onOpenPost={openPost}
                content={props.post.content}
            />

            <PostFooter
                numberOfComments={props.post.numberOfComments}
                onOpenPost={openPost}
            />

        </View>

    )
}

const styles = StyleSheet.create({
    postItem: {
        marginVertical: 3
    }
})

export default PostItem;