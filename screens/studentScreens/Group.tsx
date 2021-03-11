import React, {useState, useEffect} from 'react'
import {View,Alert, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native'
import GroupHeader from '../../components/GroupHeader'
import PostItem from '../../components/PostItem'
import WritePost from '../../components/WritePost'
import {useSelector} from 'react-redux'
import {Button} from 'react-native-elements'
import axios from 'axios'
import HOST , {SERVER_PORT} from '../../configs/config'
import CustomeActivityIndicator from '../../components/CustomActivityIndicator'
import {io} from 'socket.io-client'

const Group = (props) => {


    const [GroupPosts, setGroupPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const addPost = (post) => {
        const updatePosts:any = [...GroupPosts, post]
        setGroupPosts(updatePosts)
    }

    useEffect(() => {
        let isCancelled = false 
        const fetchGroupPosts = async () => {
            try {
                const response = await axios.get(
                    `http://${HOST}:${SERVER_PORT}/student/group/posts/${props.route.params.id}`
                )
    
                if (response.status === 200) {
                    setIsLoaded(true)
                    if (!isCancelled)
                    setGroupPosts(response.data.posts)
                }
            }
            catch(err) {
                console.log(err)
            }
        }
        
        fetchGroupPosts()
        // const socket = io('http://10.0.2.2:4200/')
        // socket.on('posts', data=> {
        //     if (data.action === 'createdPost') {
        //        addPost(data.post)
        //     }
        // })
        return () => {
            isCancelled = true
        }
    }, [GroupPosts, props.route.params.id])

    const openGroupMembers = () => {
        props.navigation.navigate('GroupMembers', {
            groupId:props.route.params.id
        })
    }


    const openCreatePost = () => {
        props.navigation.navigate('CreatePost', {
            groupId: props.route.params.id,
            userImage: props.route.params.userImage,
            userId: props.route.params.userId ,
            username: props.route.params.username
        })
    }

    const openPost = (postId, content, ownerId) => {
        props.navigation.navigate('FullPost', {
            postId: postId,
            groupId:props.route.params.id, 
            content: content,
            ownerId: ownerId
        })
    }

    return(
        <ScrollView style={styles.group}>
            <GroupHeader 
            numberOfMembers={props.route.params.numberOfMembers} 
            title={props.route.params.title}
            openGroupMembers={openGroupMembers}
            />
            <Button title="messages" onPress={()=> props.navigation.navigate('ChattingScreen', {
                groupId: props.route.params.id
            })}/>
            <WritePost imageUrl={props.route.params.userImage} onTouch={openCreatePost}/>
            {
                !isLoaded ? <CustomeActivityIndicator/>:
                GroupPosts.map(post=> {
                    return <PostItem ownerId={post.ownerId}  key={post._id} onOpenPost={()=> openPost(post._id, post.content, post.ownerId)} content={post.content}/>
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    group: {
        backgroundColor:'lightgrey',
        flex:1,
    }
})  

export default Group;