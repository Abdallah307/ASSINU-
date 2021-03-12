import React, { useState, useEffect } from 'react'
import { View, Alert, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import GroupHeader from '../../components/groupComponents/GroupHeader'
import PostItem from '../../components/postComponents/PostItem'
import WritePost from '../../components/postComponents/WritePost'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-elements'
import axios from 'axios'
import HOST, { SERVER_PORT } from '../../configs/config'
import CustomeActivityIndicator from '../../components/UI/CustomActivityIndicator'
import { io } from 'socket.io-client'
import {CourseGroup} from '../../api/api'

const Group = (props) => {


    const [GroupPosts, setGroupPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const params = props.route.params

    useEffect(() => {
        let isCancelled = false
        const fetchGroupPosts = async () => {
            try {
                const groupId = params.id
                const response = await CourseGroup.fetchPosts(groupId)

                if (response.status === 200) {
                    setIsLoaded(true)
                    if (!isCancelled)
                        setGroupPosts(response.data.posts)
                }
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchGroupPosts()
        return () => {
            isCancelled = true
        }
    }, [GroupPosts, params])

    const openGroupMembers = () => {
        props.navigation.navigate('GroupMembers', {
            groupId: params.id
        })
    }


    const openCreatePost = () => {
        props.navigation.navigate('CreatePost', {
            groupId: params.id,
            userImage: params.userImage,
            userId: params.userId,
            username: params.username
        })
    }

    const openPost = (postId, content, ownerId) => {
        props.navigation.navigate('FullPost', {
            postId: postId,
            groupId: params.id,
            content: content,
            ownerId: ownerId
        })
    }

    return (
        <ScrollView style={styles.group}>

            <GroupHeader
                numberOfMembers={params.numberOfMembers}
                title={params.title}
                openGroupMembers={openGroupMembers}
            />

            <Button
                title="messages"
                onPress={() => props.navigation.navigate('ChattingScreen', {
                    groupId: params.id
                })}
            />

            <WritePost
                imageUrl={params.userImage}
                onTouch={openCreatePost}
            />

            {
                !isLoaded ? <CustomeActivityIndicator /> :
                    GroupPosts.map(post => {
                        return (
                            <PostItem
                                ownerId={post.ownerId}
                                key={post._id}
                                onOpenPost={() => openPost(post._id, post.content, post.ownerId)}
                                content={post.content}
                            />
                        )
                    })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    group: {
        backgroundColor: 'lightgrey',
        flex: 1,
    }
})

export default Group;