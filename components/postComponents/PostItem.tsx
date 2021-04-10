import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import HOST, {SERVER_PORT} from '../../configs/config'
import axios from 'axios'

const PostItem = (props) => {

    return (
        
            <View style={styles.postItem}>

                <PostHeader 
                createdAt={props.createdAt}
                ownerName={props.ownerId.name} 
                imageUrl={props.ownerId.imageUrl}
                />

                <PostBody 
                onOpenPost={props.onOpenPost} 
                content={props.content} 
                />

                <PostFooter 
                numberOfComments={props.numberOfComments}
                onOpenPost={props.onOpenPost} 
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