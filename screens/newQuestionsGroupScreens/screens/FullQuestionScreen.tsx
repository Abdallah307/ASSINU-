import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text , Keyboard} from "react-native";
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

const FullQuestionScreen = (props) => {
  const params = props.route.params;
  const groupName = !params.question.departmentId
    ? "publicgroup"
    : "departmentgroup";
  const { answers, isLoaded, isCleared } = useSelector(
    (state) => state.answers
  );

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const { userId, token } = useSelector((state) => state.auth);

  const fetchQuestionAnswers = async () => {
    try {
      !params.question.departmentId ? "publicgroup" : "departmentgroup";
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/${groupName}/questions/${params.question._id}/answers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.answers);
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
    Keyboard.dismiss()
    setInputValue('')
    console.log('the input value is : ',inputValue)
    try {
      const response = await axios.post(
        `http://${HOST}:${SERVER_PORT}/${groupName}/questions/addanswer`,
        {
          content: inputValue,
          question: params.question._id,
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
        if (groupName === "departmentgroup") {
          dispatch(
            privateGroupActions.INCREMENT_NUMBER_OF_ANSWERS({
              questionId: params.question._id,
            })
          );
        } else {
          dispatch(
            publicGroupActions.INCREMENT_NUMBER_OF_ANSWERS({
              questionId: params.question._id,
            })
          );
        }
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
    try {
      const response = await axios.put(
        `http://${HOST}:${SERVER_PORT}/${groupName}/questions/answer/upvote`, {
          answerId : answer._id ,
        },
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      )

      if (response.status === 201) {
        dispatch(answersActions.UPVOTE_ANSWER({
          answerId : answer._id ,
          userId : userId 
        }))
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const downvoteAnswer = async (answer) => {
    try {
      const response = await axios.put(
        `http://${HOST}:${SERVER_PORT}/${groupName}/questions/answer/downvote`, {
          answerId : answer._id ,
        },
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      )

      if (response.status === 201) {
        dispatch(answersActions.DOWNVOTE_ANSWER({
          answerId : answer._id ,
          userId : userId 
        }))
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.mainContainer}>
      {!isLoaded ? (
        <CustomActivityIndicator />
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ paddingBottom: 200 }}
            ListHeaderComponent={
              <QuestionItem
                numberOfAnswers={answers.length}
                question={params.question}
                isFollowed={params.isFollowed}
                onFollowPressed={() => {
                  dispatch(
                    toggleFollowingStatus({
                      questionId: params.question._id,
                      userId: userId,
                      groupName: !params.question.departmentId
                        ? "publicgroup"
                        : "departmentgroup",
                    })
                  );
                }}
              />
            }
            data={answers}
            renderItem={({ item }) => {
              return (
                <AnswerItem
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
            placeholder='Write your answer ...'
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
