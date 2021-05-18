import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../screens/mainScreens/DrawerContent";
import StudentTabNavigator from "./StudentTabNavigator";
import DepartmentQuestions from "../screens/questionsScreens/DepartmentQuestions";
import UniversityQuestionsNavigator from "./UniversityQuestionsNavigator";
import SharingCenterNavigator from "./SharingCenterNavigator";
import { Colors } from "../constants/Colors";
import DepartmentGroup from "../screens/teacherScreens/DepartmentGroup";
import GroupNavigator from "./newNavigation/GroupNavigator";
import SettingScreen from "../screens/settings/SettingScreen";
import SettingsNavigator from "./SettingsNavigator";
import * as Notifications from "expo-notifications";
import { socket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import AskScreen from "../screens/Ask/AskScreen";
import AskStackNavigator from "./AskStackNavigator";
import {actions as askActions} from '../store/Ask'
import {Notification as Notification} from '../Notifications/Notifications'


Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});



const Drawer = createDrawerNavigator();

const StudentDrawerNavigator = (props: any) => {
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    const postCreatedListener = async (data) => {
      if (
        data.members.some(
          (member) => member === userId && member != data.emiter
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

    const questionCreatedListener = (data) => {
      if (
        data.members.some(
          (member) => member === userId && member != data.emiter
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

    const answerAddedToQuestionFollowedHandler = (data) => {
      if (
        data.followers.some(
          (follower) => follower === userId && follower != data.emiter
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

    const commentOnMyPostHandler = (data) => {
      if (data.emiter !== userId && data.postOwner === userId)
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

    const commentOnMyAnswerHandler = (data) => {
      if (data.emiter !== userId && data.answerOwner === userId)
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

    const replayedToMyCommentHandler = (data) => {
      if (data.emiter !== userId && data.commentOwner === userId)
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

    const incomingAskQuestionHandler = (data) => {
      if (data.receiver === userId) {
        dispatch(askActions.ADD_RECEIVED_QUESTION_REALTIME({
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

    const myAskQuestionAnsweredHandler = (data) => {
      
      if (data.receiver === userId) {
        console.log('Answer Data is : ', data)
        dispatch(askActions.ADD_ANSWER_TO_ASKED_QUESTION_REALTIME({
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

    socket.on('myAskQuestionAnswered', myAskQuestionAnsweredHandler)

    socket.on("createdpost", postCreatedListener);
    socket.on("createdQuestion", questionCreatedListener);
    socket.on("commentOnMyPost", commentOnMyPostHandler);
    socket.on("commentOnMyAnswer", commentOnMyAnswerHandler);
    socket.on("replayedToMyComment", replayedToMyCommentHandler);
    socket.on(
      "answerAddedToQuestionFollowed",
      answerAddedToQuestionFollowedHandler
    );
    socket.on("askQuestion", incomingAskQuestionHandler);

    return () => {
      socket.off("createdpost", postCreatedListener);
      socket.off("commentOnMyPost", commentOnMyPostHandler);
      socket.off("commentOnMyAnswer", commentOnMyAnswerHandler);
      socket.off("replayedToMyComment", replayedToMyCommentHandler);
      socket.off("createdQuestion", questionCreatedListener);
      socket.off(
        "answerAddedToQuestionFollowed",
        answerAddedToQuestionFollowedHandler
      );
      socket.off("askQuestion", incomingAskQuestionHandler);
      socket.off('myAskQuestionAnswered', myAskQuestionAnsweredHandler)
    };
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeBackgroundColor: Colors.primary,
        }}
        drawerType="slide"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="StudentTabNavigator"
          component={StudentTabNavigator}
          options={{
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="GroupNavigator"
          component={GroupNavigator}
          options={{
            title: "Hello Group Navigator",
          }}
        />

        {/* <Drawer.Screen
          name="PrivateGroupScreen"
          component={PrivateGroupNavigator}
          options={{
            title: "Private Group",
          }}
        />

        <Drawer.Screen
          name="PublicGroupScreen"
          component={PublicGroupNavigator}
          options={{
            title: "Public Group",
          }}
        /> */}

        <Drawer.Screen
          name="SharingCenter"
          component={SharingCenterNavigator}
          options={{
            title: "Sharing Center",
          }}
        />

        <Drawer.Screen name="AskStackNavigator" component={AskStackNavigator} />

        <Drawer.Screen
          name="SettingsNavigator"
          component={SettingsNavigator}
          options={{
            title: "Settings",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default StudentDrawerNavigator;
