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
import { actions as sharingCenterActions } from "../sharingcenter";
import {actions as chattingActions } from '../chatting'
import {actions as notificationActions} from '../Notification'
import {actions as feedActions} from '../Feed'

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
export const deleteGroupPoll = createAction("deleteGroupPoll");

export const fetchGroupTimeline = createAction("fetchGroupTimeline");

export const fetchAskReceivedQuestions = createAction(
  "fetchAskReceivedQuestions"
);
export const fetchAskAnsweredQuestions = createAction(
  "fetchAskAnsweredQuestions"
);
export const fetchAskaskedQuestions = createAction("fetchAskaskedQuestions");

export const answerReceivedQuestion = createAction("answerReceivedQuestion");

export const switchNotificationsStatus = createAction(
  "switchNotificationsStatus"
);
export const switchMyAskStatus = createAction("switchMyAskStatus");

export const fetchDepartmentSharedItems = createAction(
  "fetchDepartmentSharedItems"
);
export const fetchPublicSharedItems = createAction("fetchPublicSharedItems");
export const fetchUserSharedItems = createAction("fetchUserSharedItems");
export const fetchSharingCenterOtherRequests = createAction(
  "fetchSharingCenterOtherRequests"
);
export const fetchSharingCenterMyRequests = createAction(
  "fetchSharingCenterMyRequests"
);
export const shareItemInSharingCenter = createAction(
  "shareItemInSharingCenter"
);
export const requestItemFromOwner = createAction("requestItemFromOwner");
export const replayToItemRequest = createAction("replayToItemRequest");
export const markItemAsReserved = createAction("markItemAsReserved");
export const markItemAsUnReserved = createAction("markItemAsUnReserved");

export const votePoll = createAction("votePoll");

export const fetchUserChatsList = createAction("fetchUserChatsList");
export const fetchChatMessages = createAction("fetchChatMessages");

export const fetchFeedTimeline = createAction('fetchFeedTimeline')


const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    const { token, userId, name, departmentId, courses, userType} = getState().auth;
    if (action.type === fetchFeedTimeline.type ) {
      dispatch(groupActions.SET_IS_LOADED({
        isLoaded : false 
      }))
      try {
        const response = await axios.post(
          `http:${HOST}:${SERVER_PORT}/user/feed`,
          {
            courses : JSON.stringify(courses),
            departmentId : departmentId ,
            publicGroupId : "609ef8bd145ffdd7a70e0d95",
            userType : userType
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
          if (response.status === 200) {
            dispatch(groupActions.SET_TIMELINE({
              timeline: response.data.timeline,
            }))
          }
        
      }
      catch(err) {
        console.log(err)
      }
    }
   else if (action.type === deleteGroupPost.type) {
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
    }
    else if (action.type === deleteGroupPoll.type) {
      try {
        const pollId = action.payload.pollId;
        const response = await axios.delete(
          `http:${HOST}:${SERVER_PORT}/group/polls/delete/${pollId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 201) {
          dispatch(
            groupActions.DELETE_POLL({
              pollId: pollId,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
     else if (action.type === fetchAskReceivedQuestions.type) {
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
            username: name,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 201) {
          dispatch(
            askActions.ADD_ANSWER_TO_RECEIVED_QUESTION({
              questionId: questionId,
              answer: answer,
            })
          );
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
        const groupType = action.payload.groupType
        
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/group/timeline/${groupId}/${groupType}`,
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
    } else if (action.type === switchNotificationsStatus.type) {
      try {
        dispatch(authActions.switchNotifications());
        const response = await axios.put(
          `http:${HOST}:${SERVER_PORT}/user/notfications/switch`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === switchMyAskStatus.type) {
      try {
        dispatch(authActions.switchMyAsk());
        const response = await axios.put(
          `http:${HOST}:${SERVER_PORT}/user/myask/switch`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === fetchDepartmentSharedItems.type) {
      try {
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/sharingcenter/department/${departmentId}/shareditems`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            sharingCenterActions.SET_DEPARTMENT_ITEMS({
              departmentItems: response.data.items,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === fetchPublicSharedItems.type) {
      try {
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/sharingcenter/public/sharedItems`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            sharingCenterActions.SET_PUBLIC_ITEMS({
              publicItems: response.data.items,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === fetchUserSharedItems.type) {
      try {
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/sharingcenter/user/shareditems`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            sharingCenterActions.SET_MY_ITEMS({
              myItems: response.data.items,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === fetchSharingCenterMyRequests.type) {
      try {
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/sharingcenter/myrequests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            sharingCenterActions.SET_MY_REQUESTS({
              requests: response.data.requests,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === fetchSharingCenterOtherRequests.type) {
      try {
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/sharingcenter/othersrequests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            sharingCenterActions.SET_Other_REQUESTS({
              requests: response.data.requests,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === shareItemInSharingCenter.type) {
      try {
        const { title, details, price, imageData, shareLocation } =
          action.payload;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("details", details);
        formData.append("price", price);

        shareLocation === "department"
          ? formData.append("departmentId", departmentId)
          : null;

        formData.append("imageUrl", imageData);

        const response = await axios.post(
          `http://${HOST}:${SERVER_PORT}/sharingcenter/shareitem`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 201) {
          console.log(response.data.item);
          if (shareLocation === "department") {
            dispatch(
              sharingCenterActions.SHARE_ITEM_TO_DEPARTMENT({
                item: response.data.item,
              })
            );
          } else if (shareLocation === "public") {
            dispatch(
              sharingCenterActions.SHARE_ITEM_TO_PUBLIC({
                item: response.data.item,
              })
            );
          }

          dispatch(
            sharingCenterActions.ADD_ITEM_TO_MY_ITEMS({
              item: response.data.item,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === requestItemFromOwner.type) {
      try {
        const response = await axios.post(
          `http://${HOST}:${SERVER_PORT}/sharingcenter/requestitem`,
          {
            itemId: action.payload.itemId,
            receiver: action.payload.receiver,
            message: action.payload.message,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          console.log(response.data.request);
          dispatch(
            sharingCenterActions.ADD_REQUEST_TO_MY_REQUESTS({
              request: response.data.request,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === votePoll.type) {
      try {
        const { pollId, choiceId } = action.payload;

        const response = await axios.post(
          `http://${HOST}:${SERVER_PORT}/group/polls/vote`,
          {
            pollId: pollId,
            choiceId: choiceId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          dispatch(
            groupActions.VOTE_POLL({
              pollId: pollId,
              choiceId: choiceId,
              userId: userId,
              voters: response.data.voters,
              choices: response.data.choices,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else if (action.type === fetchUserChatsList.type) {
      try {
        const response = await axios.get(
          `http://${HOST}:${SERVER_PORT}/user/messages/chats`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

         if (response.status === 200) {
            dispatch(chattingActions.SET_CHATS({
              chats : response.data.chatUsers
            }))
         }

      } catch (err) {
        console.log(err)
      }
    }
    else if (action.type === fetchChatMessages.type) {
      try {
        const response = await axios.post(`http://${HOST}:${SERVER_PORT}/user/messages`, {
          receiver: action.payload.receiverId
        }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })

        if (response.status === 200) {
          
          dispatch(chattingActions.SET_MESSAGES({
            chatMessages : response.data.messages
          }))
        }
      }
      catch (err) {
        console.log(err)
      }
    }
     else {
      next(action);
    }
  };

export default api;
