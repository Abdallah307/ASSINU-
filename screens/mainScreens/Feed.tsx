import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button as ReactNativeButton,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
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
  votePoll,
  fetchFeedTimeline,
  deleteGroupPoll,
} from "../../store/middleware/api";
import { actions as groupActions } from "../../store/Group";
import PostItem from "../newQuestionsGroupScreens/components/PostItem";
import QuestionItem from "../newQuestionsGroupScreens/components/QuestionItem";
import FloatingButton from "../../components/UI/FloatingButton";
import { TouchableButton } from "../Profile/TouchableButton";
import { socket } from "../../socket";
import NotFound from "../../components/UI/NotFound";
import { no_feed } from "../../constants/compiledImages";

const Feed = (props) => {
  const dispatch = useDispatch();

  const [optionsOverlayVisible, setOptionsOverlayVisible] = useState(false);

  const [currentSelectedPost, setCurrentSelectedPost] = useState(null);

  const [selectedItemType, setSelectedItemType] = useState(null);

  

  const { timeline, isLoaded } = useSelector((state) => {
    return state.group;
  });
  const { token, userId, imageUrl, name } = useSelector((state) => state.auth);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(groupActions.CLEAR_TIMELINE({}));
      dispatch(fetchFeedTimeline());
    }
  }, [isFocused]);

  const AddVoteToPoll = (pollId, choiceId) => {
    dispatch(
      votePoll({
        pollId: pollId,
        choiceId: choiceId,
      })
    );
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
      props.navigation.navigate("StudentProfile", {
        user: user,
      });
    } else {
      props.navigation.navigate("Profile");
    }
  };

  const renderGroupPostAndPolls = ({ item }) => {
    if (item.type === "post") {
      const likes = item.likes;
      let isLiked = isPostLiked(likes);
      let showOptions = item.owner._id === userId;
      return (
        <PostItem
          onPressOptionsButton={() => {
            setOptionsOverlayVisible(true);
            setCurrentSelectedPost(item._id);
            setSelectedItemType("post");
          }}
          showGroupName={true}
          groupName={item.groupName}
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
      let showOptions = item.owner._id === userId;
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
          onPressOptionsButton={() => {
            setOptionsOverlayVisible(true);
            setCurrentSelectedPost(item._id);
            setSelectedItemType("poll");
          }}
          showGroupName={true}
          groupName={item.groupName}
          showOptions={showOptions}
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
          showGroupName={true}
          groupName={item.groupName}
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

  const deleteGroupItem = () => {
    if (selectedItemType === "post") {
      dispatch(
        deleteGroupPost({
          postId: currentSelectedPost,
        })
      );
    } else if (selectedItemType === "poll") {
      dispatch(
        deleteGroupPoll({
          pollId: currentSelectedPost,
        })
      );
    }
    setOptionsOverlayVisible(false);
    setCurrentSelectedPost(null);
    setSelectedItemType(null);
  };

  const handleReachEnd = () => {
    console.log("Reached the end of the scrolling man");
  };

  if (timeline.length === 0) {
    return (
      <NotFound
            title='No posts yet'
            titleStyle={{
                fontFamily : 'OpenSans-Bold',
                fontSize : 18
            }}
            image={no_feed}
            style={{
                width : 200,
                height : 200
            }}
            />
    )
  }

  return (
    <View style={{flex : 1, backgroundColor : 'white'}}>
      {!isLoaded ? (
        <CustomeActivityIndicator />
      ) : (
        <GroupScreen
          refreshing={!isLoaded}
          onRefresh={() => {
            dispatch(fetchFeedTimeline());
          }}
          data={timeline}
          renderItem={renderGroupPostAndPolls}
          keyExtractor={(item, index) => item._id.toString()}
          onEndReached={() => console.log("End Reached")}
          onEndReachedThreshold={0.1}
        />
      )}

      <Overlay
        isVisible={optionsOverlayVisible}
        fullScreen={true}
        overlayStyle={{ position: "absolute", bottom: 0, height: "30%" }}
        onBackdropPress={() => {
          setOptionsOverlayVisible(false);
          setCurrentSelectedPost(null);
          setSelectedItemType(null);
        }}
        animationType="slide"
      >
        <TouchableButton
          onPress={deleteGroupItem}
          titleStyle={{ color: "black" }}
          title="Delete Post"
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "flex-start",
          }}
        />
        <TouchableButton
          titleStyle={{ color: "black" }}
          title="Edit Post"
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "flex-start",
          }}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    backgroundColor: "lightgrey",
    flex: 1,
  },
});

export default Feed;
