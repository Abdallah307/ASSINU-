import React from "react";
import {} from "react-redux";
import * as Notifications from "expo-notifications";
import 

export class Notification {
  constructor(userId, dispatch) {
    this.userId = userId;
    this.dispatch = dispatch;
    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldPlaySound: true,
          shouldShowAlert: true,
        };
      },
    });
  }

  postCreatedListener = async (data) => {
    if (
      data.members.some(
        (member) => member === this.userId && member != data.emiter
      )
    ) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "ASSINU",
          body: `${data.username} created a post in ${data.groupName}`,
        },
        trigger: {
          seconds: 1,
        },
      });
    }
  };


   questionCreatedListener = (data) => {
    if (
      data.members.some(
        (member) => member === this.userId && member != data.emiter
      )
    ) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "ASSINU",
          body: `${data.username} asked a question in ${data.groupName}`,
        },
        trigger: {
          seconds: 1,
        },
      });
    }
  };

   answerAddedToQuestionFollowedHandler = (data) => {
    if (
      data.followers.some(
        (follower) => follower === this.userId && follower != data.emiter
      )
    ) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "ASSINU",
          body: `${data.username} answered a question you are following`,
        },
        trigger: {
          seconds: 1,
        },
      });
    }
  };

   commentOnMyPostHandler = (data) => {
    if (data.emiter !== this.userId && data.postOwner === this.userId)
      Notifications.scheduleNotificationAsync({
        content: {
          title: "ASSINU",
          body: `${data.username} created a comment in your post`,
        },
        trigger: {
          seconds: 1,
        },
      });
  };

   commentOnMyAnswerHandler = (data) => {
    if (data.emiter !== this.userId && data.answerOwner === this.userId)
      Notifications.scheduleNotificationAsync({
        content: {
          title: "ASSINU",
          body: `${data.username} created a comment in your answer`,
        },
        trigger: {
          seconds: 1,
        },
      });
  };

   replayedToMyCommentHandler = (data) => {
    if (data.emiter !== this.userId && data.commentOwner === this.userId)
      Notifications.scheduleNotificationAsync({
        content: {
          title: "ASSINU",
          body: `${data.username} replayed to your comment`,
        },
        trigger: {
          seconds: 1,
        },
      });
  };

   incomingAskQuestionHandler = (data) => {
    if (data.receiver === this.userId) {
      this.dispatch(askActions.ADD_RECEIVED_QUESTION_REALTIME({
        question : data.question
      }))
      Notifications.scheduleNotificationAsync({
        content: {
          title: "ASSINU",
          body: `someone asked you a question`,
        },
        trigger: {
          seconds: 1,
        },
      });
    }
  };

   myAskQuestionAnsweredHandler = (data) => {
    
    if (data.receiver === this.userId) {
      console.log('Answer Data is : ', data)
      this.dispatch(askActions.ADD_ANSWER_TO_ASKED_QUESTION_REALTIME({
        questionId : data.questionId,
        answer : data.answer
      }))
      Notifications.scheduleNotificationAsync({
        content: {
          title: "ASSINU",
          body: `${data.emiterName} answered your ask question`,
        },
        trigger: {
          seconds: 1,
        },
      });
    }
  };
}
