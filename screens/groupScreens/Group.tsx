import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
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
import { useDispatch, useSelector } from 'react-redux'
import {fetchGroupTimeline, togglePostLikeStatus, toggleFollowingStatus} from '../../store/middleware/api'
import {actions as groupActions} from '../../store/Group'
import PostItem from '../newQuestionsGroupScreens/components/PostItem'
import QuestionItem from '../newQuestionsGroupScreens/components/QuestionItem'
import FloatingButton from '../../components/UI/FloatingButton'

const Group = (props) => {


    const dispatch = useDispatch()
    const {timeline, isLoaded} = useSelector(state => {
        return state.group
    })
    const params = props.route.params

    const {token, userId, imageUrl ,name} = useSelector(state => state.auth)
    //remember the bug here (add groups screen)
    useEffect(() => {
        console.log('hala group')
        dispatch(groupActions.CLEAR_TIMELINE({}))

        dispatch(fetchGroupTimeline({
            groupId : params.id 
        }))
    
    }, [params.id])

   

    const openGroupMembers = () => {
        props.navigation.navigate('GroupMembers', {
            groupId: params.id
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

    const openImage = (imageUrl) => {
        props.navigation.navigate('FullImageScreen', {
          imageUrl : imageUrl
        })
      }
  
      const isPostLiked = (likes) => {
        const isLiked = likes.some(item => {
          return item === userId 
        })
        return isLiked
      }

      const onLikePostPressed = (post) => {
        dispatch(togglePostLikeStatus({
          postId : post._id,
          userId : userId ,
        }))
      }

      const onFollowQuestionPressed = async (question) => {
  
          dispatch(toggleFollowingStatus({
            questionId : question._id,
            userId : userId
          }))
      }

      const isQuestionFollowed = (followers) => {
        const isFollowing = followers.some(follower => {
          return follower === userId
        })
        console.log(isFollowing)
        return isFollowing
      }

      const openCreatePostQuestion = (navScreen, groupName) => {
        props.navigation.navigate("CreatePostQuestionScreen", {
            groupId : params.id
        });
      };
  
      const openPost = (post) => {
        props.navigation.navigate('FullPostScreen', {
          post : post,
        })
      }
  
      const openQuestion = (question, isFollowed) => {
        props.navigation.navigate('FullQuestionScreen', {
          question : question,
        })
      }


    const renderGroupPostAndPolls = ({item}) => {
        if (item.type === 'post') {
            const likes = item.likes
            let isLiked = isPostLiked(likes)
            return (
            <PostItem 
            onLikePostPressed={onLikePostPressed.bind(this, item)}
            isLiked={isLiked}
            post={item}
            onPress={openPost.bind(this, item)}
            openImage={openImage.bind(this, item.imageUrl)}
            />
            );
        }
        else if (item.type === 'poll') {
            const voters = item.voters
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
                    openVotersListScreen={(choiceId) => openVotersListScreen(item.voters, choiceId)}
                    votePoll={votePoll}
                    isAlreadyVoted={isAlreadyVoted}
                    voter={voter}
                    poll={item}
                />
            )
        }
        else if (item.type === 'question') {
            const followers = item.followers
            const isFollowed = isQuestionFollowed(followers)
            
            return (
                <QuestionItem 
                numberOfAnswers={item.numberOfAnswers}
                question={item}
                onPress={openQuestion.bind(this, item, isFollowed)}
                isFollowed={isFollowed}
                onFollowPressed={() => onFollowQuestionPressed(item)}
                openImage={openImage.bind(this, item.imageUrl)}
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
                            userImage: imageUrl,
                            userId: userId,
                            username: name,
                            navScreen: 'Group'
                        })}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: 1
                        }}
                    />
                </View>

                <WritePost
                    imageUrl={imageUrl}
                    //onTouch={openCreatePost}
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
                                showChattingButton={params.showChattingButton}
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
                        data={timeline}
                        renderItem={renderGroupPostAndPolls}
                        keyExtractor={(item, index) => item._id.toString()}
                        onEndReached={() => console.log('End Reached')}
                        onEndReachedThreshold={0.1}
                    />

            }
            <FloatingButton
            size={65}
            activeOpacity={0.7}
            backgroundColor='red'
            onPress={openCreatePostQuestion}
            />
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