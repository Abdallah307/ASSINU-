import React from "react";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useSelector } from "react-redux";
import { Colors } from "../constants/Colors";
import { Image, View, Text } from "react-native";
import HOST, { SERVER_PORT } from "../configs/config";
import { NavigationContainer } from "@react-navigation/native";
import Feed from "../screens/teacherScreens/Feed";
import DepartmentGroup from "../screens/teacherScreens/DepartmentGroup";
import Notifications from "../screens/teacherScreens/Notifications";
import UserProfile from "../screens/teacherScreens/UserProfile";
import { createStackNavigator } from "@react-navigation/stack";
import Group from "../screens/groupScreens/Group";
import GroupMembers from "../screens/groupScreens/GroupMembers";
import ChattingScreen from "../screens/groupScreens/GroupChatting";
import FullImageScreen from "../screens/postsScreens/FullImageScreen";
import FullPost from "../screens/postsScreens/FullPost";
import StudentProfile from "../screens/OtherUsersProfile/UserProfile";
import VotersListScreen from "../components/groupComponents/VotersListScreen";
import GroupNavigator from "./newNavigation/GroupNavigator";
import CreatePollScreen from "../screens/newQuestionsGroupScreens/screens/CreatePollScreen";
import ChattingNavigator from "./ChattingNavigator";
import UserProfileNavigator from './UserProfileNavigator'
import AvailableGroupsNavigator from "./AvailableGroupsNavigator";
import FeedNavigator from "./FeedNavigator";
import NotificationNavigator from "./NotificationNavigator";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TeacherTabNavigator = (props) => {
  const userImage = useSelector((state) => {
    return state.auth.imageUrl;
  });

  return (
    
      <Tab.Navigator
        shifting={true}
        initialRouteName="Feed"
        sceneAnimationEnabled={true}
      barStyle={{
        // backgroundColor: Colors.primary,
        backgroundColor: Colors.white,
        borderTopWidth: 1.5,
        borderTopColor: Colors.greyb,
      }}
      activeColor={Colors.prussianBlue}
      >
        <Tab.Screen
          name="FeedNavigator"
          component={FeedNavigator}
        options={{
          title : 'Feed',
          tabBarColor: Colors.white,
          tabBarIcon: () => <Feather name="home" size={24} color={Colors.greyb} />,
        }}
        />

        <Tab.Screen
          initialParams={{ abdo: "abdo" }}
          name="Groups"
          component={AvailableGroupsNavigator}
        options={{
          title: "Groups",
          tabBarColor: Colors.white,
          tabBarIcon: () => (
            <FontAwesome name="group" size={24} color={Colors.greyb} />
          ),
        }}
        />

        <Tab.Screen
          name="NotificationsNavigator"
          component={NotificationNavigator}
        options={{
          title : 'Notifications',
          tabBarColor: Colors.white,
          tabBarIcon: () => (
            <Ionicons name="notifications" size={24} color={Colors.greyb} />
          ),
        }}
        />

        <Tab.Screen
          name="Chatting"
          component={ChattingNavigator}
        options={{
          tabBarColor: Colors.white,
          tabBarIcon: () => (
            <Ionicons name="ios-chatbubbles-sharp" size={24} color={Colors.greyb} />
          ),
        }}
        />

        <Tab.Screen
          name="UserProfile"
          component={UserProfileNavigator}
        options={{
          tabBarColor: Colors.white,
          title: "Profile",
          tabBarIcon: () => (
            <Image
              style={{ width: 24, height: 24, borderRadius: 12 }}
              source={{ uri: `http://${HOST}:${SERVER_PORT}/${userImage}` }}
            />
          ),
        }}
        />
      </Tab.Navigator>
  );
};

const DepartmentGroupNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: "OpenSans-Bold",
        },
        headerStyle: {
          backgroundColor: Colors.primary,
          elevation: 0,
        },
      }}
    >
      <Stack.Screen name="DepartmentGroup" component={DepartmentGroup} />

      <Stack.Screen name="CreatePost" component={CreatePost} />

      <Stack.Screen name="FullPost" component={FullPost} />

      <Stack.Screen name="GroupMembers" component={GroupMembers} />

      <Stack.Screen
        name="FullImageScreen"
        options={{
          title: "Image",
          headerStyle: {
            backgroundColor: "black",
            elevation: 0,
          },
        }}
        component={FullImageScreen}
      />

      <Stack.Screen name="CreatePollScreen" component={CreatePollScreen} />
    </Stack.Navigator>
  );
};

const TeacherProfileNavigator = (props: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: "OpenSans-Bold",
        },
        headerStyle: {
          backgroundColor: Colors.primary,
          elevation: 0,
        },
      }}
    >
      <Stack.Screen name="Profile" component={UserProfile} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="GroupNavigator"
        component={GroupNavigator}
      />
      {/* 
            <Stack.Screen
                name="CreatePost"
                component={CreatePost}
            />

            <Stack.Screen
                name="FullPost"
                component={FullPost}
            />

            <Stack.Screen
                name="GroupMembers"
                component={GroupMembers}
            />

            <Stack.Screen
                name="StudentProfile"
                component={StudentProfile}
            />

            <Stack.Screen
                name="FullImageScreen"
                options={{
                    title: 'Image',
                    headerStyle: {
                        backgroundColor: 'black',
                        elevation: 0
                    }
                }}
                component={FullImageScreen}
            />

            <Stack.Screen name="Poll" component={Poll} />

            <Stack.Screen
                options={{ title: 'Chatting' }}
                name="ChattingScreen"
                component={ChattingScreen}
            />

            <Stack.Screen name='VotersListScreen' component={VotersListScreen} /> */}
    </Stack.Navigator>
  );
};

export default TeacherTabNavigator;
