import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HOST, { SERVER_PORT } from "../../../configs/config";
import PostItem from "../components/PostItem";
import { actions as commentActions } from "../../../store/comment";
import { FlatList } from "react-native-gesture-handler";
import Input from "../components/Input";
import CommentItem from "../../../components/commentComponents/CommentItem";
import { Button } from "react-native-elements";
import { actions as privateGroupActions } from "../../../store/PrivateGroup";
import { actions as publicGroupActions } from "../../../store/PublicGroup";
import { togglePostLikeStatus } from "../../../store/middleware/api";
import {actions as groupActions} from '../../../store/Group'

const FullPostScreen = (props) => {
  const params = props.route.params;

  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const { userId, token } = useSelector((state) => state.auth);

  const post = useSelector((state) => {
    return state.group.timeline.find((item) => {
      return item.type === "post" && item._id === params.post._id;
    });
  });

  const comments = useSelector((state) => {
    return state.comments.comments;
  });

  useEffect(() => {
    dispatch(commentActions.CLEAR_COMMENTS({}));
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/group/comments/${params.post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          commentActions.SET_COMMENTS({
            comments: response.data.comments,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitComment = async () => {
    try {
      setInputValue("");
      Keyboard.dismiss();
      const response = await axios.post(
        `http://${HOST}:${SERVER_PORT}/group/addcomment`,
        {
          content: inputValue,
          referedTo: post._id,
          type : 'post'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("yes");
        dispatch(
          commentActions.CREATE_COMMENT({
            comment: response.data.comment,
          })
        );

        dispatch(groupActions.INCREMENT_NUMBER_OF_POST_COMMENTS({
          postId : post._id 
        }))
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openReplaysScreen = (comment) => {
    props.navigation.navigate("ReplayScreen", {
      comment: comment,
    });
  };

  const isPostLiked = (post) => {
    const isLiked = post.likes.some((item) => {
      return item === userId;
    });
    return isLiked;
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ListHeaderComponent={() => {
          const isLiked = isPostLiked(post);
          return (
            <PostItem
              isLiked={isLiked}
              onLikePostPressed={() => {
                dispatch(
                  togglePostLikeStatus({
                    postId: post._id,
                    userId: userId,
                  })
                );
              }}
              post={post}
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: 200 }}
        data={comments}
        renderItem={({ item }) => {
          return (
            <CommentItem
              imageUrl={item.owner.imageUrl}
              name={item.owner.name}
              createdAt={item.createdAt}
              content={item.content}
            >
              <Button
                title="Replay"
                onPress={openReplaysScreen.bind(this, item)}
              />
            </CommentItem>
          );
        }}
        keyExtractor={(item) => item._id}
      />
      <Input
        value={inputValue}
        onChangeText={(value) => setInputValue(value)}
        onPressButton={submitComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default FullPostScreen;
