import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import SignInn from "../screens/authScreens/SignInn";
import SignUpp from "../screens/authScreens/SignUpp";
import { Colors } from "../constants/Colors";
import StudentDrawerNavigator from "./StudentDrawerNavigator";
import TeacherTabNavigator from "./TeacherTabNavigator";
import { socket } from "../socket";
import HOST, { SERVER_PORT } from "../configs/config";
import * as Notifications from "expo-notifications";
import TeacherDrawerNavigator from "./teacherDrawerNavigator";
import {actions as chattingActions} from '../store/chatting'
import { SignUpVerificationScreen } from "../screens/authScreens/SignUpVerificationCode";

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      //   shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});

const AuthNavigator = (props: any) => {
  const dispatch = useDispatch()
  const { isSignedIn, userId } = useSelector((state) => {
    return state.auth;
  });

  const email = useSelector((state) => {
    return state.auth.email;
  });

  useEffect(() => {
    if (isSignedIn) {
      socket.connect()
      const newChatHandler = (data) => {
        
        if (data.chat.user._id !== userId) {
          dispatch(chattingActions.ADD_NEW_CHAT({
            chat : data.chat,
          }))

          
        }
        // else {
        //   dispatch(chattingActions.SET_LAST_MESSAGE({
        //     chatId : data.chat.user._id ,
        //     lastMessage : data.chat.lastMessage
        //   }))
        // }
        
        
      }

      socket.on('newChat', newChatHandler)
      
    } else {
      socket.disconnect();
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerTintColor: "white",
            headerStyle: {
              elevation: 0,
              backgroundColor: Colors.primary,
            },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="SignIn" component={SignInn} />
          <Stack.Screen name="SignUp" component={SignUpp} />
          <Stack.Screen name='VerificationCodeScreen' component={SignUpVerificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (email.split("@")[1] === "stu.najah.edu") {
    return <StudentDrawerNavigator />;
  } else if (email.split("@")[1] === "najah.edu") {
    return <TeacherDrawerNavigator/>;
  }
};

export default AuthNavigator;
