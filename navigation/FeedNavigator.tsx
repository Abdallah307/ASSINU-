import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../screens/mainScreens/Feed";
import { Colors } from "../constants/Colors";
import FullPostScreen from "../screens/newQuestionsGroupScreens/screens/FullPostScreen";
import FullAnswerScreen from "../screens/newQuestionsGroupScreens/screens/FullAnswerScreen";
import FullQuestionScreen from "../screens/newQuestionsGroupScreens/screens/FullQuestionScreen";
import AnswersReplayScreen from "../screens/newQuestionsGroupScreens/screens/AnswerReplaysScreen";
import FullImageScreen from "../screens/postsScreens/FullImageScreen";
import ReplayScreen from "../screens/newQuestionsGroupScreens/screens/ReplayScreen";
import VotersListScreen from "../components/groupComponents/VotersListScreen";
import UserProfile from "../screens/OtherUsersProfile/UserProfile";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { UserSearchScreen } from "../screens/mainScreens/UserSearchScreen";
import CreateAskQuestionScreen from "../screens/Ask/CreateAskQuestionScreen";

const Stack = createStackNavigator();

const FeedNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Feed",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          elevation: 0,
          backgroundColor: Colors.primary,
        },
      }}
    >
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={({route, navigation}) => ({
          headerRight: () => {
            return (
              <Button
                type="clear"
                onPress={() => navigation.navigate('UserSearchScreen')}
                containerStyle={{
                  marginRight: 15,
                }}
                icon={<FontAwesome name="search" size={28} color="white" />}
              />
            );
          },
        })}
      />
      <Stack.Screen name="FullPostScreen" component={FullPostScreen} />
      <Stack.Screen name="FullAnswerScreen" component={FullAnswerScreen} />
      <Stack.Screen name="FullQuestionScreen" component={FullQuestionScreen} />
      <Stack.Screen
        name="AnswerReplaysScreen"
        component={AnswersReplayScreen}
      />
      <Stack.Screen name="FullImageScreen" component={FullImageScreen} />
      <Stack.Screen name="ReplayScreen" component={ReplayScreen} />
      <Stack.Screen name="VotersListScreen" component={VotersListScreen} />
      <Stack.Screen name="StudentProfile" component={UserProfile} />
      <Stack.Screen name='UserSearchScreen' component={UserSearchScreen} />
      <Stack.Screen name="CreateAskQuestionScreen" component={CreateAskQuestionScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
