import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import GroupHeader from '../../components/groupComponents/GroupHeader'
import PostItem from '../../components/postComponents/PostItem'
import WritePost from '../../components/postComponents/WritePost'
import { Button } from 'react-native-elements'
import CustomeActivityIndicator from '../../components/UI/CustomActivityIndicator'
import { CourseGroup } from '../../api/api'
import { AntDesign } from '@expo/vector-icons';
import MyComponent from '../../components/groupComponents/CreatePollButton'
import CreatePollButton from '../../components/groupComponents/CreatePollButton'
import { FlatList } from 'react-native-gesture-handler'


const Group = (props) => {


    const [GroupPosts, setGroupPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const params = props.route.params

    useEffect(() => {
        let isCancelled = false
        const fetchGroupPosts = async () => {
            console.log('fetch group posts')
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
    }, [props.route.params.postCreated])


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

    const openPost = (post) => {
        props.navigation.navigate('FullPost', {
            postId: post.postId,
            groupId: params.id,
            content: post.content,
            owner: post.owner,
            numberOfComments: post.numberOfComments,
            createdAt: post.createdAt
        })
    }

    const GroupHeaderComponent = () => {
        return (
            <>
                <GroupHeader
                    numberOfMembers={params.numberOfMembers}
                    title={params.title}
                    openGroupMembers={openGroupMembers}
                    openChatting={() => props.navigation.navigate('ChattingScreen', {
                        groupId: params.id
                    })}
                />
                <Button
                    title='Members'
                    onPress={openGroupMembers}
                />
                <CreatePollButton onPress={() => props.navigation.navigate("Poll", {
                    groupId: params.id,
                    userImage: params.userImage,
                    userId: params.userId,
                    username: params.username
                })} />

                <WritePost
                    imageUrl={params.userImage}
                    onTouch={openCreatePost}
                />
            </>
        )
    }

    const handleReachEnd = () => {
        console.log('Reached the end of the scrolling man')
    }

    

    return (
        <>
            {
                !isLoaded ? <CustomeActivityIndicator /> :
                    <FlatList
                        ListHeaderComponent={GroupHeaderComponent}
                        data={GroupPosts}
                        renderItem={(itemData) => {
                            const post = itemData.item
                            return (
                                <PostItem
                                    numberOfComments={post.numberOfComments}
                                    owner={post.owner}
                                    key={post.postId}
                                    onOpenPost={() => openPost(post)}
                                    content={post.content}
                                    createdAt={post.createdAt}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={handleReachEnd}
                        onEndReachedThreshold={0}
                    />
            }
        </>
    )
}

const styles = StyleSheet.create({
    group: {
        backgroundColor: 'lightgrey',
        flex: 1,
    },

})

export default Group;