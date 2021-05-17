import axios, { AxiosRequestConfig } from "axios";
import HOST, { SERVER_PORT } from "../../configs/config";
import { actions as questionsActions } from "../UniversityQuestions";
import { actions as publicGroupActions } from "../PublicGroup";
import { actions as privateGroupActions } from "../PrivateGroup";
import { actions as answersActions } from "../answer";
import { createAction } from "@reduxjs/toolkit";
import { actions as groupActions } from "../Group";
import { actions as authActions } from "../auth";
import { actions as askActions } from "../Ask";

export const fetchUniversityQuestions = createAction(
  "fetchUniversityQuestions"
);
export const toggleFollowingStatus = createAction("toggleFollowingStatus");
export const addUniversityQuestion = createAction("addUniversityQuestion");
export const addAnswer = createAction("addAnswer");
export const fetchQuestionAnswers = createAction("fetchAnswers");
export const fetchPublicGroupData = createAction("fetchPublicGroupData");
export const fetchPrivateGroupData = createAction("fetchPrivateGroupData");
export const upvoteAnswer = createAction("upvoteAnswer");
export const downvoteAnswer = createAction("downvoteAnswer");
export const togglePostLikeStatus = createAction("togglePostLikeStatus");
export const changeProfileImage = createAction("changeProfileImage");

export const deleteGroupPost = createAction("deleteGroupPost");
export const fetchGroupTimeline = createAction("fetchGroupTimeline");

export const fetchAskReceivedQuestions = createAction(
  "fetchAskReceivedQuestions"
);
export const fetchAskAnsweredQuestions = createAction(
  "fetchAskAnsweredQuestions"
);
export const fetchAskaskedQuestions = createAction("fetchAskaskedQuestions");

export const answerReceivedQuestion = createAction("answerReceivedQuestion");

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    const { token, userId, name } = getState().auth;

    if (action.type === deleteGroupPost.type) {
      try {
        const postId = action.payload.postId;
        const response = await axios.delete(
          `http:${HOST}:${SERVER_PORT}/group/posts/delete/${postId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 201) {
          dispatch(
            groupActions.DELETE_POST({
              postId: postId,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === fetchAskReceivedQuestions.type) {
      try {
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/ask/receivedquestions/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.status === 200) {
          dispatch(
            askActions.SET_QUESTIONS({
              questions: response.data.questions,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === answerReceivedQuestion.type) {
      try {
        const questionId = action.payload.questionId;
        const answer = action.payload.answer;
        const response = await axios.post(
          `http://${HOST}:${SERVER_PORT}/ask/answerquestion`,
          {
            questionId: questionId,
            answer: answer,
            username : name 
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 201) {
          dispatch(askActions.ADD_ANSWER_TO_RECEIVED_QUESTION({
            questionId : questionId,
            answer : answer,
          }))
        }

      } catch (err) {
        console.log(err);
      }
    } else if (action.type === fetchAskaskedQuestions.type) {
      try {
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/ask/askedquestions/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            askActions.SET_ASKED_QUESTIONS({
              askedQuestions: response.data.questions,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === fetchAskAnsweredQuestions.type) {
      try {
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/ask/answered/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            askActions.SET_ANSWERD_QUESTIONS({
              answeredQuestions: response.data.questions,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === changeProfileImage.type) {
      try {
        const formData = new FormData();
        let localUri = action.payload.image;
        let filename = localUri.split("/").pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append("imageUrl", { uri: localUri, name: filename, type });
        const response = await axios.post(
          `http:${HOST}:${SERVER_PORT}/user/changeimage`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 201) {
          dispatch(
            authActions.CHANGE_PROFILE_IMAGE({
              imageUrl: response.data.imageUrl,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === fetchGroupTimeline.type) {
      try {
        const groupId = action.payload.groupId;
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/group/timeline/${groupId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            groupActions.SET_TIMELINE({
              timeline: response.data.timeline,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === toggleFollowingStatus.type) {
      try {
        const { questionId, userId } = action.payload;
        const response = await axios.put(
          `http://${HOST}:${SERVER_PORT}/group/questions/follow`,
          {
            questionId: questionId,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 201) {
          dispatch(
            groupActions.TOGGLE_FOLLOW_QUESTION({
              questionId: questionId,
              userId: userId,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === togglePostLikeStatus.type) {
      try {
        const postId = action.payload.postId;
        const userId = action.payload.userId;
        const response = await axios.put(
          `http://${HOST}:${SERVER_PORT}/group/posts/likepost`,
          {
            postId: postId,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 201) {
          console.log("like it or not i dont care man");
          dispatch(
            groupActions.TOGGLE_LIKE_POST({
              postId: postId,
              userId: userId,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === upvoteAnswer.type) {
      try {
        const { answerId, userId } = action.payload;
        const response = await axios.put(
          `http://${HOST}:${SERVER_PORT}/group/questions/answer/upvote`,
          {
            answerId: answerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          dispatch(
            answersActions.UPVOTE_ANSWER({
              answerId: answerId,
              userId: userId,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === downvoteAnswer.type) {
      try {
        const { answerId, userId } = action.payload;
        const response = await axios.put(
          `http://${HOST}:${SERVER_PORT}/group/questions/answer/downvote`,
          {
            answerId: answerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          dispatch(
            answersActions.DOWNVOTE_ANSWER({
              answerId: answerId,
              userId: userId,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      next(action);
    }
  };

export default api;
