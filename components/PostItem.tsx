import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import {useSelector} from 'react-redux'
import HOST, {SERVER_PORT} from '../configs/config'
import axios from 'axios'

const PostItem = (props) => {
    const [owner, setOwner] = useState({})

    useEffect(() => {
        axios.get(`http://${HOST}:${SERVER_PORT}/student/${props.ownerId}`)
        .then(response=> {
            setOwner(response.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [owner, props.ownerId])
    return (
        
            <View style={styles.postItem}>
                <PostHeader time ownerName={owner.name} imageUrl={owner.imageUrl}/>
                <PostBody ownerName={owner.name} imageUrl={owner.imageUrl} postId={props.postId} onOpenPost={props.onOpenPost} content={props.content} />
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