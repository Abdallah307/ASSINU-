import axios, { AxiosRequestConfig } from "axios";
import HOST, { SERVER_PORT } from "../../configs/config";
import { actions as questionsActions } from "../UniversityQuestions";
import { actions as publicGroupActions } from "../PublicGroup";
import { actions as privateGroupActions } from "../PrivateGroup";
import {actions as answersActions} from '../answer'
import { createAction } from "@reduxjs/toolkit";

export const fetchUniversityQuestions = createAction(
  "fetchUniversityQuestions"
);
export const toggleFollowingStatus = createAction("toggleFollowingStatus");
export const addUniversityQuestion = createAction("addUniversityQuestion");
export const addAnswer = createAction("addAnswer");
export const fetchQuestionAnswers = createAction("fetchAnswers");
export const fetchPublicGroupData = createAction("fetchPublicGroupData");
export const fetchPrivateGroupData = createAction("fetchPrivateGroupData");
export const upvoteAnswer = createAction('upvoteAnswer')
export const downvoteAnswer = createAction('downvoteAnswer')


const api = ({ dispatch, getState }) => (next) => async (action) => {
  const token = getState().auth.token;

  if (action.type === fetchPublicGroupData.type) {
    try {
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/publicgroup/postsquestions`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          publicGroupActions.SET_DATA({
            data: response.data.data,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  } else if (action.type === fetchPrivateGroupData.type) {
    try {
      const departmentId = action.payload.departmentId;
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/departmentgroup/postsquestions/${departmentId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          privateGroupActions.SET_DATA({
            data: response.data.data,
          })
        );

      }
    } catch (err) {
      console.log(err);
    }
  } else if (action.type === toggleFollowingStatus.type) {
    try {
      const {questionId , groupName, userId} = action.payload
      const response = await axios.put(
        `http://${HOST}:${SERVER_PORT}/${groupName}/questions/follow`, {
          questionId : questionId
        },{
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )

      if (response.status === 201) {
        if (groupName === 'publicgroup')
          dispatch(publicGroupActions.TOGGLE_FOLLOW_QUESTION({
            questionId : questionId,
            userId : userId 
          }))
        else if (groupName === 'departmentgroup')
          dispatch(privateGroupActions.TOGGLE_FOLLOW_QUESTION({
            questionId : questionId,
            userId : userId 
          }))
      }
    }
    catch(err) {
        console.log(err)
    }
  }
  else if (action.type === upvoteAnswer.type) {
    try {
      const {groupName, answerId, userId} = action.payload
      const response = await axios.put(
        `http://${HOST}:${SERVER_PORT}/${groupName}/questions/answer/upvote`, {
          answerId : answerId ,
        },
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      )

      if (response.status === 201) {
        dispatch(answersActions.UPVOTE_ANSWER({
          answerId : answerId ,
          userId : userId 
        }))
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  else if (action.type === downvoteAnswer.type) {
    try {
      const {groupName, answerId, userId} = action.payload
      const response = await axios.put(
        `http://${HOST}:${SERVER_PORT}/${groupName}/questions/answer/downvote`,
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
  }
    else {
    next(action);
  }
};

export default api;
