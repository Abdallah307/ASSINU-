import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { CourseGroup } from '../../api/api'
import PollItemSingleChoice from '../../components/groupComponents/PollItemSingleChoice'
import PostItem from '../../components/postComponents/PostItem'
import WritePost from '../../components/postComponents/WritePost'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import HOST, { SERVER_PORT } from '../../configs/config'
import { Colors } from '../../constants/Colors'
import GroupHeader from '../Group/GroupHeader'
import GroupScreen from '../Group/GroupScreen'

const DepartmentGroup = props => {

    const [GroupPosts, setGroupPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)



    const { 
        userId,
        numberOfMembers,
        name,
        imageUrl,
        token,
        departmentId,
        departmentName
    } = useSelector(state => {
        return state.auth
    })


    useEffect(() => {
        let isCancelled = false
        const fetchGroupPosts = async () => {
            console.log('fetch group posts')
            try {
                const groupId = departmentId
                const response = await CourseGroup.fetchPosts(groupId, token)

                if (response.status === 200) {
                    setIsLoaded(true)
                    if (!isCancelled)
                        setGroupPosts(response.data.posts)
                }

            }
            catch (err) {
                console.log(err.message)
            }
        }

        fetchGroupPosts()
        return () => {
            isCancelled = true
        }
    }, [])


    const openCreatePost = () => {
        props.navigation.navigate('CreatePost', {
            groupId: departmentId,
            userImage: imageUrl,
            userId: userId,
            username: name,
            navScreen: 'DepartmentGroup'
        })
    }

    useEffect(() => {
        if (props.route.params?.post) {
            let posts = [...GroupPosts]
            posts.unshift(props.route.params.post)
            setGroupPosts(posts)
        }
    }, [props.route.params?.post])

    useEffect(() => {
        if (props.route.params?.poll) {
            let posts = [...GroupPosts]
            posts.unshift(props.route.params.poll)
            setGroupPosts(posts)
        }
    }, [props.route.params?.poll])

    const votePoll = (pollId, choiceId) => {
        const voterId = userId
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
                    return voter.voterId._id === userId
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

   

    const GroupHeaderComponent = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'white' }}>
                    <Button
                        containerStyle={{ flex: 1, marginHorizontal: 5 }}
                        title='Participants'
                        // onPress={openGroupMembers}
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
                            groupId: departmentId,
                            userImage: imageUrl,
                            userId: userId,
                            username: name,
                            navScreen: 'DepartmentGroup'
                        })}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: 1
                        }}
                    />
                </View>

                <WritePost
                    imageUrl={imageUrl}
                    onTouch={openCreatePost}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            { !isLoaded ? <CustomActivityIndicator /> :
                <GroupScreen
                    ListHeaderComponent={
                        <GroupHeader
                            numberOfMembers={numberOfMembers}
                            title={departmentName}
                        >
                            <GroupHeaderComponent />
                        </GroupHeader>
                    }
                    data={GroupPosts}
                    renderItem={renderGroupPostAndPolls}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => console.log('End Reached')}
                    onEndReachedThreshold={0.1}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({

})

export default DepartmentGroup