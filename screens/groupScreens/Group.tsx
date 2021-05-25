import React, { useState, useEffect } from "react";
import { StyleSheet,Button as ReactNativeButton, View, Text, ScrollView } from "react-native";
import WritePost from "../../components/postComponents/WritePost";
import { Button, Overlay } from "react-native-elements";
import CustomeActivityIndicator from "../../components/UI/CustomActivityIndicator";
import { CourseGroup } from "../../api/api";
import { Colors } from "../../constants/Colors";
import PollItemSingleChoice from "../../components/groupComponents/PollItemSingleChoice";
import axios from "axios";
import HOST, { SERVER_PORT } from "../../configs/config";
import GroupScreen from "../Group/GroupScreen";
import GroupHeader from "../Group/GroupHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroupTimeline,
  togglePostLikeStatus,
  toggleFollowingStatus,
  deleteGroupPost,
  votePoll
} from "../../store/middleware/api";
import { actions as groupActions } from "../../store/Group";
import PostItem from "../newQuestionsGroupScreens/components/PostItem";
import QuestionItem from "../newQuestionsGroupScreens/components/QuestionItem";
import FloatingButton from "../../components/UI/FloatingButton";
import { TouchableButton } from "../Profile/TouchableButton";
import { socket } from "../../socket";

const Group = (props) => {
  const dispatch = useDispatch();

  const [optionsOverlayVisible , setOptionsOverlayVisible] = useState(false)

  const [currentSelectedPost , setCurrentSelectedPost] = useState(null)

  const { timeline, isLoaded } = useSelector((state) => {
    return state.group;
  });
  const params = props.route.params;
  const { token, userId, imageUrl, name } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("hala group");
    dispatch(groupActions.CLEAR_TIMELINE({}));

    dispatch(
      fetchGroupTimeline({
        groupId: params.id,
        groupType : params.groupType 
      })
    );
  }, [params.id]);

 
  const openGroupMembers = () => {
    props.navigation.navigate("GroupMembers", {
      groupId: params.id,
      groupMembers : params.groupMembers 
    });
  };

  const AddVoteToPoll = (pollId, choiceId) => {
    dispatch(votePoll({
      pollId : pollId,
      choiceId : choiceId 
    }))
    // axios
    //   .post(
    //     `http://${HOST}:${SERVER_PORT}/group/polls/vote`,
    //     {
    //       pollId: pollId,
    //       voterId: voterId,
    //       choiceId: choiceId,
    //     },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     response.status === 201 ? console.log("Voted Successfully") : null;
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };

  const openVotersListScreen = (voters, choiceId) => {
    props.navigation.navigate("VotersListScreen", {
      voters: voters,
      choiceId: choiceId,
    });
  };

  const openImage = (imageUrl) => {
    props.navigation.navigate("FullImageScreen", {
      imageUrl: imageUrl,
    });
  };

  const isPostLiked = (likes) => {
    const isLiked = likes.some((item) => {
      return item === userId;
    });
    return isLiked;
  };

  const onLikePostPressed = (post) => {
    dispatch(
      togglePostLikeStatus({
        postId: post._id,
        userId: userId,
      })
    );
  };

  const onFollowQuestionPressed = async (question) => {
    dispatch(
      toggleFollowingStatus({
        questionId: question._id,
        userId: userId,
      })
    );
  };

  const isQuestionFollowed = (followers) => {
    const isFollowing = followers.some((follower) => {
      return follower === userId;
    });
    return isFollowing;
  };

  const openCreatePostQuestion = (navScreen, groupName) => {
    props.navigation.navigate("CreatePostQuestionScreen", {
      groupId: params.id,
      students: params.students,
      groupName : params.title,
      username : name,
      groupMembers : params.groupMembers,
      groupType : params.groupType
    });
  };

  const openPost = (post) => {
    props.navigation.navigate("FullPostScreen", {
      post: post,
    });
  };

  const openQuestion = (question, isFollowed) => {
    props.navigation.navigate("FullQuestionScreen", {
      question: question,
    });
  };

  const openUserProfile = (user) => {
    if (user._id !== userId) {
      props.navigation.navigate('StudentProfile', {
        user : user
      })
    }
    else {
      props.navigation.navigate('Profile')
    }
    
  };

  const renderGroupPostAndPolls = ({ item }) => {
    if (item.type === "post") {
      const likes = item.likes;
      let isLiked = isPostLiked(likes);
      let showOptions = item.owner._id === userId 
      return (
        <PostItem
          onPressOptionsButton={() => {
            setOptionsOverlayVisible(true)
            setCurrentSelectedPost(item._id)
          }}
          showOptions={showOptions}
          onPressHeader={openUserProfile.bind(this, item.owner)}
          onLikePostPressed={onLikePostPressed.bind(this, item)}
          isLiked={isLiked}
          post={item}
          onPress={openPost.bind(this, item)}
          openImage={openImage.bind(this, item.imageUrl)}
        />
      );
    } else if (item.type === "poll") {
      const voters = item.voters;
      let isAlreadyVoted;
      let voter;
      if (voters.length !== 0) {
        voter = voters.find((voter) => {
          return voter.voterId._id === userId;
        });

        if (!voter) {
          isAlreadyVoted = false;
        } else isAlreadyVoted = true;
      }
      return (
        <PollItemSingleChoice
          onPressHeader={openUserProfile.bind(this, item.owner)}
          openVotersListScreen={(choiceId) =>
            openVotersListScreen(item.voters, choiceId)
          }
          AddVoteToPoll={AddVoteToPoll}
          isAlreadyVoted={isAlreadyVoted}
          voter={voter}
          poll={item}
        />
      );
    } else if (item.type === "question") {
      const followers = item.followers;
      const isFollowed = isQuestionFollowed(followers);

      return (
        <QuestionItem
          onPressHeader={openUserProfile.bind(this, item.owner)}
          numberOfAnswers={item.numberOfAnswers}
          question={item}
          onPress={openQuestion.bind(this, item, isFollowed)}
          isFollowed={isFollowed}
          onFollowPressed={() => onFollowQuestionPressed(item)}
          openImage={openImage.bind(this, item.imageUrl)}
        />
      );
    }
  };

  const handleReachEnd = () => {
    console.log("Reached the end of the scrolling man");
  };

  const GroupHeaderChildren = () => {
    return (
      <View style={{ borderBottomWidth: 0.5, borderColor: Colors.greybb, marginBottom: 20, borderTopWidth: 0.5 }}>
        <View
          style={{ flexDirection: "row", flex: 1, backgroundColor: "white", marginBottom: 5, marginTop: 5}}
        >
          <Button
            containerStyle={{ flex: 1, marginHorizontal: 2, backgroundColor: 'transparent' }}
            title="Participants"
            onPress={openGroupMembers}
            titleStyle={{
              color: Colors.primary,
            }}
            buttonStyle={{
              backgroundColor: "transparent",
              //borderWidth: 1,
            }}
          />

          <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 25, color: Colors.primary }}>
              |
            </Text>
          </View>


          <Button
            title="Create poll"
            titleStyle={{
              color: Colors.primary,
            }}
            containerStyle={{ flex: 1, marginHorizontal: 2, backgroundColor: 'transparent' }}
            onPress={() =>
              props.navigation.navigate("CreatePollScreen", {
                groupId: params.id,
                groupType : params.groupType
              })
            }
            buttonStyle={{
              backgroundColor: "transparent",
             // borderWidth: 1,
            }}
          />
        </View>

       
      </View>
    );
  };

  return (
    <>
      {!isLoaded ? (
        <CustomeActivityIndicator />
      ) : (
        <GroupScreen
          ListHeaderComponent={
            <GroupHeader
              showChattingButton={params.showChattingButton}
              numberOfMembers={params.numberOfMembers}
              title={params.title}
              openGroupMembers={openGroupMembers}
              openChatting={() =>
                props.navigation.navigate("ChattingScreen", {
                  groupId: params.id,
                  title: params.title,
                })
              }
            >
              <GroupHeaderChildren />
            </GroupHeader>
          }
          data={timeline}
          renderItem={renderGroupPostAndPolls}
          keyExtractor={(item, index) => item._id.toString()}
          onEndReached={() => console.log("End Reached")}
          onEndReachedThreshold={0.1}
        />
      )}
      <FloatingButton
        size={65}
        activeOpacity={0.7}
        backgroundColor={Colors.primary}
        onPress={openCreatePostQuestion}
      />

      <Overlay 
      isVisible={optionsOverlayVisible} 
      fullScreen={true}
      overlayStyle={{position:'absolute', bottom : 0, height : "30%"}}
      onBackdropPress={() => {
        setOptionsOverlayVisible(false)
        setCurrentSelectedPost(null)
      }}
      animationType='slide'
      >
        <TouchableButton
        onPress={() => {
          dispatch(deleteGroupPost({
            postId : currentSelectedPost
          }))
          setOptionsOverlayVisible(false)
          setCurrentSelectedPost(null)
        }}
        titleStyle={{color :'black'}}
        title='Delete Post'
        style={{flexDirection : 'row',backgroundColor:'white', justifyContent : 'flex-start'}}
        />
        <TouchableButton
        titleStyle={{color :'black'}}
        title='Edit Post'
        style={{flexDirection : 'row',backgroundColor:'white', justifyContent : 'flex-start'}}
        />
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  group: {
    backgroundColor: "lightgrey",
    flex: 1,
  },
});

export default Group;
