import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import QuestionItem from "../components/QuestionItem";
import { toggleFollowingStatus } from "../../../store/middleware/api";
import Input from "../components/Input";
import axios from "axios";
import HOST, { SERVER_PORT } from "../../../configs/config";
import AnswerItem from "../components/AnswerItem";
import { actions as answersActions } from "../../../store/answer";
import { actions as privateGroupActions } from "../../../store/PrivateGroup";
import { actions as publicGroupActions } from "../../../store/PublicGroup";
import CustomActivityIndicator from "../../../components/UI/CustomActivityIndicator";
import {
  upvoteAnswer as upvoteAnswerAction,
  downvoteAnswer as downvoteAnswerAction,
} from "../../../store/middleware/api";

import {actions as groupActions} from '../../../store/Group'

const FullQuestionScreen = (props) => {
  const params = props.route.params;
  const groupName = !params.question.departmentId
    ? "publicgroup"
    : "departmentgroup";
  const { answers, isLoaded, isCleared } = useSelector(
    (state) => state.answers
  );

  const question = useSelector((state) => {
    return state.group.timeline.find((item) => {
      return item.type === "question" && item._id === params.question._id;
    });
  });

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const { userId, token, name } = useSelector((state) => state.auth);

  const fetchQuestionAnswers = async () => {
    try {
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/group/questions/${params.question._id}/answers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          answersActions.SET_ANSWERS({
            answers: response.data.answers,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitAnswer = async () => {
    Keyboard.dismiss();
    setInputValue("");
    console.log("the input value is : ", inputValue);
    try {
      const response = await axios.post(
        `http://${HOST}:${SERVER_PORT}/group/questions/addanswer`,
        {
          content: inputValue,
          question: params.question._id,
          username : name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        dispatch(
          answersActions.ADD_ANSWER({
            answer: response.data.answer,
          })
        );
       
        dispatch(groupActions.INCREMENT_NUMBER_OF_ANSWERS({
          questionId : params.question._id
        }))

      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    dispatch(answersActions.CLEAR_ANSWERS({}));
    fetchQuestionAnswers();
  }, []);

  const openAnswer = (answer) => {
    props.navigation.navigate("FullAnswerScreen", {
      answer: answer,
      groupName: groupName,
    });
  };

  const upvoteAnswer = async (answer) => {
    dispatch(
      upvoteAnswerAction({
        userId: userId,
        answerId: answer._id,
      })
    );
  };

  const downvoteAnswer = async (answer) => {
    dispatch(
      downvoteAnswerAction({
        userId: userId,
        answerId: answer._id,
      })
    );
  };

  const isQuestionFollowed = (followers) => {
    const isFollowing = followers.some((follower) => {
      return follower === userId;
    });
    console.log(isFollowing);
    return isFollowing;
  };

  const checkIfVoted = (voters) => {
    return voters.some((voter) => {
      return voter === userId;
    });
  };

  return (
    <View style={styles.mainContainer}>
      {!isLoaded ? (
        <CustomActivityIndicator />
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ paddingBottom: 200 }}
            ListHeaderComponent={() => {
              const isFollowed = isQuestionFollowed(question.followers);
              return (
                <QuestionItem
                  numberOfAnswers={answers.length}
                  question={question}
                  isFollowed={isFollowed}
                  onFollowPressed={() => {
                    dispatch(
                      toggleFollowingStatus({
                        questionId: params.question._id,
                        userId: userId,
                      })
                    );
                  }}
                />
              );
            }}
            data={answers}
            renderItem={({ item }) => {
              let isUpvoted = false;
              let isDownvoted = false;
              isUpvoted = checkIfVoted(item.upvoters);
              !isUpvoted ? (isDownvoted = checkIfVoted(item.downvoters)) : null;
              return (
                <AnswerItem
                  isUpvoted={isUpvoted}
                  isDownvoted={isDownvoted}
                  upvoteAnswer={upvoteAnswer.bind(this, item)}
                  downvoteAnswer={downvoteAnswer.bind(this, item)}
                  answer={item}
                  onPress={openAnswer.bind(this, item)}
                />
              );
            }}
            keyExtractor={(item) => item._id}
          />
          <Input
            value={inputValue}
            placeholder="Write your answer ..."
            onChangeText={(value) => setInputValue(value)}
            onPressButton={submitAnswer}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default FullQuestionScreen;
