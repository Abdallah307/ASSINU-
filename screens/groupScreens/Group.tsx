import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import PostItem from '../../components/postComponents/PostItem'
import WritePost from '../../components/postComponents/WritePost'
import { Button } from 'react-native-elements'
import CustomeActivityIndicator from '../../components/UI/CustomActivityIndicator'
import { CourseGroup } from '../../api/api'
import { Colors } from '../../constants/Colors'
import PollItemSingleChoice from '../../components/groupComponents/PollItemSingleChoice'
import axios from 'axios'
import HOST, { SERVER_PORT } from '../../configs/config'
import GroupScreen from '../Group/GroupScreen'
import GroupHeader from '../Group/GroupHeader'
import { useSelector } from 'react-redux'


const Group = (props) => {


    const [GroupPosts, setGroupPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const params = props.route.params

    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        let isCancelled = false
        const fetchGroupPosts = async () => {
            console.log('fetch group posts')
            try {
                const groupId = params.id
                const response = await CourseGroup.fetchPosts(groupId, token)

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

    useEffect(() => {
        if (params?.poll) {
            let posts = [...GroupPosts]
            posts.unshift(params.poll)
            setGroupPosts(posts)
        }
    }, [params?.poll])


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
            navScreen: 'Group'
        })
    }

    const votePoll = (pollId, choiceId) => {
        const voterId = params.userId
        axios.post(`http://${HOST}:${SERVER_PORT}/group/polls/vote`, {
            pollId: pollId,
            voterId: voterId,
            choiceId: choiceId
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                response.status === 201 ? console.log('Voted Successfully') : null
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const openVotersListScreen = (voters, choiceId) => {
        props.navigation.navigate('VotersListScreen', {
            voters: voters,
            choiceId: choiceId
        })
    }


    const renderGroupPostAndPolls = (itemData) => {
        if (itemData.item.type === 'post') {
            const post = itemData.item
            let imageUrl;
            try { imageUrl = post.imageUrl } catch (err) { imageUrl = null }

            return (
                <PostItem
                    onPostHeaderPressed={() => {
                        props.navigation.navigate('StudentProfile', {
                            student: post.ownerId,
                        })
                    }}
                    navigation={props.navigation}
                    imageUrl={imageUrl}
                    post={post}
                />
            )
        }
        else if (itemData.item.type === 'poll') {
            const voters = itemData.item.voters
            let isAlreadyVoted;
            let voter;
            if (voters.length !== 0) {
                voter = voters.find(voter => {
                    return voter.voterId._id === params.userId
                })

                if (!voter) {
                    isAlreadyVoted = false
                }
                else isAlreadyVoted = true

            }
            return (
                <PollItemSingleChoice
                    openVotersListScreen={(choiceId) => openVotersListScreen(itemData.item.voters, choiceId)}
                    votePoll={votePoll}
                    isAlreadyVoted={isAlreadyVoted}
                    voter={voter}
                    poll={itemData.item}
                />
            )
        }
    }


    const handleReachEnd = () => {
        console.log('Reached the end of the scrolling man')
    }

    const GroupHeaderChildren = () => {
        return (
            <View>
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
                            username: params.username,
                            navScreen: 'Group'
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
            </View>
        )
    }



    return (
        <>
            {
                !isLoaded ? <CustomeActivityIndicator /> :
                    <GroupScreen
                        ListHeaderComponent={
                            <GroupHeader
                                showChattingButton={true}
                                numberOfMembers={params.numberOfMembers}
                                title={params.title}
                                openGroupMembers={openGroupMembers}
                                openChatting={() => props.navigation.navigate('ChattingScreen', {
                                    groupId: params.id,
                                    title: params.title
                                })}
                            >
                                <GroupHeaderChildren />
                            </GroupHeader>
                        }
                        data={GroupPosts}
                        renderItem={renderGroupPostAndPolls}
                        keyExtractor={(item, index) => item._id.toString()}
                        onEndReached={() => console.log('End Reached')}
                        onEndReachedThreshold={0.1}
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