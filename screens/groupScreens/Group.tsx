import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import GroupHeader from '../../components/groupComponents/GroupHeader'
import PostItem from '../../components/postComponents/PostItem'
import WritePost from '../../components/postComponents/WritePost'
import { Button } from 'react-native-elements'
import CustomeActivityIndicator from '../../components/UI/CustomActivityIndicator'
import { CourseGroup } from '../../api/api'
import { FlatList } from 'react-native-gesture-handler'
import { Colors } from '../../constants/Colors'


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
    }, [])

    useEffect(() => {
        if (params?.post) {
            let posts = [...GroupPosts]
            posts.unshift(params.post)
            setGroupPosts(posts)
        }
    }, [params?.post])


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
            username: params.username,
            navScreen:'Group'
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
                        groupId: params.id,
                        title:params.title
                    })}
                />
                <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'white' }}>
                    <Button
                        containerStyle={{ flex: 1, marginHorizontal: 5 }}
                        title='Participants'
                        onPress={openGroupMembers}
                        titleStyle={{
                            color: Colors.blueGreen
                        }}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: 1
                        }}
                    />
                    <Button
                        title='Create poll'
                        titleStyle={{
                            color: Colors.blueGreen
                        }}
                        containerStyle={{ flex: 1, marginHorizontal: 5 }}
                        onPress={() => props.navigation.navigate("Poll", {
                            groupId: params.id,
                            userImage: params.userImage,
                            userId: params.userId,
                            username: params.username
                        })}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: 1
                        }}
                    />
                </View>

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
                            let imageUrl;
                            try { imageUrl = post.imageUrl } catch (err) { imageUrl = null }

                            return (
                                <PostItem
                                    navigation={props.navigation}
                                    imageUrl={imageUrl}
                                    post={post}
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