import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import SignInn from "../screens/authScreens/SignInn";
import SignUpp from "../screens/authScreens/SignUpp";
import { Colors } from "../constants/Colors";
import StudentDrawerNavigator from "./StudentDrawerNavigator";
import TeacherTabNavigator from "./TeacherTabNavigator";
import { socket } from "../socket";
import HOST, { SERVER_PORT } from "../configs/config";
import * as Notifications from "expo-notifications";

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
  const { isSignedIn, userId } = useSelector((state) => {
    return state.auth;
  });

  const email = useSelector((state) => {
    return state.auth.email;
  });

  useEffect(() => {
    if (isSignedIn) {
      // socket.connect();
      // console.log("yes signed in man");
      // const postCreatedListener = (data) => {
      //   console.log("The members is here : ", data.members);
      //     if (data.members.some(member => member === userId && member != data.emiter)) {
      //       Notifications.scheduleNotificationAsync({
      //         content: {
      //           title: "ASSINU",
      //           body: `${data.name} created a post in ${data.groupName}`,
      //         },
      //         trigger: {
      //           seconds: 1,
      //         },
      //       });
      //     }
          
      // };

      // socket.on("createdpost", postCreatedListener);

      // return () => {
      //   socket.off("createdpost", postCreatedListener);
      // };
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
              backgroundColor: Colors.blueGreen,
            },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="SignIn" component={SignInn} />
          <Stack.Screen name="SignUp" component={SignUpp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (email.split("@")[1] === "stu.najah.edu") {
    return <StudentDrawerNavigator />;
  } else if (email.split("@")[1] === "najah.edu") {
    return <TeacherTabNavigator />;
  }
};

export default AuthNavigator;
