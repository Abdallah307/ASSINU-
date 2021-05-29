import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Group from "../../screens/groupScreens/Group";
import CreatePostQuestionScreen from "../../screens/newQuestionsGroupScreens/screens/CreatePostQuestionScreen";
import FullPostScreen from "../../screens/newQuestionsGroupScreens/screens/FullPostScreen";
import FullAnswerScreen from "../../screens/newQuestionsGroupScreens/screens/FullAnswerScreen";
import FullQuestionScreen from "../../screens/newQuestionsGroupScreens/screens/FullQuestionScreen";
import AnswersReplayScreen from "../../screens/newQuestionsGroupScreens/screens/AnswerReplaysScreen";
import FullImageScreen from "../../screens/postsScreens/FullImageScreen";
import PostReplaysScreen from "../../screens/newQuestionsGroupScreens/screens/PostReplaysScreen";
import VotersListScreen from "../../components/groupComponents/VotersListScreen";
import GroupChatting from "../../screens/groupScreens/GroupChatting";
import ReplayScreen from "../../screens/newQuestionsGroupScreens/screens/ReplayScreen";
import CreatePollScreen from "../../screens/newQuestionsGroupScreens/screens/CreatePollScreen";
import { Colors } from "../../constants/Colors";
import UserProfile from "../../screens/OtherUsersProfile/UserProfile";
import CreateAskQuestionScreen from "../../screens/Ask/CreateAskQuestionScreen";
import GroupMembers from "../../screens/groupScreens/GroupMembers";

const Stack = createStackNavigator();

const GroupNavigator = (props) => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTintColor : 'white',
      headerTitleAlign : 'center',
      headerStyle : {
        backgroundColor : Colors.primary,
      }
    }}
    >
      <Stack.Screen
        options={{
          title : props.route.params.title,
        }}
        initialParams={props.route.params}
        name="GroupScreen"
        component={Group}
      />
      <Stack.Screen
        name="CreatePostQuestionScreen"
        component={CreatePostQuestionScreen}
        options={{
          title: "Share",
        }}
      />
      <Stack.Screen options={{title : 'Full Post'}} name="FullPostScreen" component={FullPostScreen} />
      <Stack.Screen options={{title : 'Full Answer'}} name="FullAnswerScreen" component={FullAnswerScreen} />
      <Stack.Screen options={{title : 'Full Question'}} name="FullQuestionScreen" component={FullQuestionScreen} />
      <Stack.Screen
        name="AnswerReplaysScreen"
        component={AnswersReplayScreen}
      />
      <Stack.Screen name="FullImageScreen" component={FullImageScreen} />
      <Stack.Screen options={{title : 'Replays'}} name="ReplayScreen" component={ReplayScreen} />
      <Stack.Screen name="VotersListScreen" component={VotersListScreen} />
      <Stack.Screen
        options={({ route }) => ({
          title: route.params.title,
        })}
        name="ChattingScreen"
        component={GroupChatting}
      />
      <Stack.Screen name="CreatePollScreen" component={CreatePollScreen} />
      <Stack.Screen options={{title : 'Profile'}} name="StudentProfile" component={UserProfile} />
      <Stack.Screen name="CreateAskQuestionScreen" component={CreateAskQuestionScreen} />
      <Stack.Screen options={{title :'Group members'}} name="GroupMembers" component={GroupMembers} />
    </Stack.Navigator>
  );
};

export default GroupNavigator;
