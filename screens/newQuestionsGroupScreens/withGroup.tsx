import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HOST, { SERVER_PORT } from "../../configs/config";
import PostItem from "./components/PostItem";
import QuestionItem from "./components/QuestionItem";
import {actions as privateGroupActions} from '../../store/PrivateGroup'
import {actions as publicGroupActions} from '../../store/PublicGroup'
import {toggleFollowingStatus} from '../../store/middleware/api'

export const withGroup = (WrappedComponent) => {
  const WithGroup = (props) => {

    const dispatch = useDispatch()

    const {userId, token} = useSelector(state=> state.auth)
  
    const onPressFloatingButton = (navScreen, groupName) => {
      props.navigation.navigate("CreatePostQuestionScreen", {
        navScreen: navScreen,
        groupName : groupName
      });
    };

    const openPost = (post) => {
      props.navigation.navigate('FullPostScreen', {
        post : post
      })
    }

    const openQuestion = (question, isFollowed) => {
      props.navigation.navigate('FullQuestionScreen', {
        question : question,
        isFollowed : isFollowed,
      })
    }

    

    const isQuestionFollowed = (followers) => {
      const isFollowing = followers.some(follower => {
        return follower === userId
      })
      console.log(isFollowing)
      return isFollowing
    }

    const onFollowQuestionPressed = async (question) => {
      let groupName;
      !question.departmentId ? groupName = 'publicgroup' : groupName = 'departmentgroup'

        dispatch(toggleFollowingStatus({
          groupName : groupName ,
          questionId : question._id,
          userId : userId
        }))
    }

    const openImage = (imageUrl) => {
      props.navigation.navigate('FullImageScreen', {
        imageUrl : imageUrl
      })
    }

    const renderData = ({ item }) => {
      if (item.type === "post") {
        return (
        <PostItem 
        post={item}
        onPress={openPost.bind(this, item)}
        openImage={openImage.bind(this, item.imageUrl)}
        />
        );
      } else if (item.type === "question") {
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
    };


    return (
      <WrappedComponent
        renderData={renderData}
        onPressFloatingButton={onPressFloatingButton}
        params={props.route.params}
      />
    );
  };
  return WithGroup;
};
