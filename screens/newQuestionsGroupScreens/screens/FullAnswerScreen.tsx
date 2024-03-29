import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HOST, { SERVER_PORT } from "../../../configs/config";
import AnswerItem from "../components/AnswerItem";
import Body from "../components/Body";
import Header from "../components/Header";
import Input from "../components/Input";
import { actions as commentActions } from "../../../store/comment";
import { Button } from "react-native-elements";
import { upvoteAnswer, downvoteAnswer } from "../../../store/middleware/api";
import { actions as answersActions } from "../../../store/answer";
import CommentItem from "../components/CommentItem";
import { sharedStyles } from "../../../SharedSytles";

const FullAnswerScreen = (props) => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const { token, userId, name } = useSelector((state) => state.auth);

  const answer = useSelector((state) => {
    return state.answers.answers.find((answer) => {
      return answer._id === props.route.params.answer._id;
    });
  });

  const comments = useSelector((state) => {
    return state.comments.comments;
  });

  const fetchAnswerComments = async () => {
    try {
      const answerId = answer._id;
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/group/comments/${answerId}`,
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

  React.useEffect(() => {
    dispatch(commentActions.CLEAR_COMMENTS({}));
    fetchAnswerComments();
  }, []);

  const submitComment = async () => {
    try {
      setInputValue("");
      Keyboard.dismiss();
      const response = await axios.post(
        `http://${HOST}:${SERVER_PORT}/group/addcomment`,
        {
          referedTo: answer._id,
          content: inputValue,
          type: "answer",
          username : name 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log(response.data.comment);
        dispatch(
          commentActions.CREATE_COMMENT({
            comment: response.data.comment,
          })
        );

        dispatch(
          answersActions.INCREMENT_NUMBER_OF_COMMENTS({
            answerId: answer._id,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfVoted = (voters) => {
    return voters.some((voter) => {
      return voter === userId;
    });
  };

  const openReplaysScreen = (comment) => {
    props.navigation.navigate("ReplayScreen", {
      comment: comment,
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
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        ListHeaderComponent={() => {
          let isUpvoted = false;
          let isDownvoted = false;
          isUpvoted = checkIfVoted(answer.upvoters);
          !isUpvoted ? (isDownvoted = checkIfVoted(answer.downvoters)) : null;
          return (
            <AnswerItem
              onPressHeader={openUserProfile.bind(this,answer.owner)}
              isUpvoted={isUpvoted}
              isDownvoted={isDownvoted}
              answer={answer}
              upvoteAnswer={() => {
                dispatch(
                  upvoteAnswer({
                    userId: userId,
                    answerId: answer._id,
                  })
                );
              }}
              downvoteAnswer={() => {
                dispatch(
                  downvoteAnswer({
                    userId: userId,
                    answerId: answer._id,
                  })
                );
              }}
            />
          );
        }}
        data={comments}
        renderItem={({ item }) => {
          return (
            <CommentItem comment={item} style={sharedStyles.commentItem}>
              <Button
                onPress={openReplaysScreen.bind(this, item)}
                title="Replay"
                type="clear"
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
    backgroundColor: "white",
  },
});

export default FullAnswerScreen;
